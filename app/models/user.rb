# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#
class User < ApplicationRecord

    validates :username, :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, allow_nil: true }

    before_validation :ensure_session_token

    attr_reader :password

    has_many :uploaded_videos,
        foreign_key: :uploader_id,
        class_name: :Video

    has_many :comments,
        foreign_key: :author_id,
        class_name: :Comment

    has_many :subscribed_to,
        foreign_key: :subscriber_id,
        class_name: :Subscription

    has_many :subscriptions,
        through: :subscribed_to,
        source: :creator

    has_many :is_subscribed,
        foreign_key: :creator_id,
        class_name: :Subscription

    has_many :subscribers,
        through: :is_subscribed,
        source: :subscriber

    has_many :likes,
        foreign_key: :liker_id,
        class_name: :Like

    # has_many :liked_things,
    #     through: :likes,
    #     source: :likeable

    def liked_videos
        video_ids = self.likes.where(likeable_type: "Video").map {|like| like.likeable_id}
        Video.with_attached_video_file.find(video_ids)
    end

    def subscriber_count
        self.subscribers.count
    end

    def subscription_ids
        Subscription.select(:creator_id).where(subscriber_id: self.id).map {|sub| sub.creator_id}
    end

    def video_ids
        Video.select(:id).where(uploader_id: self.id).map {|video| video.id}
    end

    def self.find_by_credentials(username, password) 
        user = User.find_by(username: username)
        return user if user && user.is_password?(password)
        nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

end
