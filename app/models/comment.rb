# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :string           not null
#  video_id   :integer
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  parent_id  :integer
#
class Comment < ApplicationRecord

    validates :content, :video_id, :author_id, presence: true

    has_many :likes, as: :likeable

    has_many :reply_comments,
        foreign_key: :parent_id,
        class_name: :Comment

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    def is_edited?
        self.created_at != self.updated_at
    end

    def reply_comment_ids
        self.reply_comments.map { |ele| ele.id }
    end

    def liker_ids
        self.likes.where(is_like: true).select(:liker_id).map { |ele| ele.liker_id }
    end

    def disliker_ids
        self.likes.where(is_like: false).select(:liker_id).map { |ele| ele.liker_id }
    end
    
end
