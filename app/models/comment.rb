# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :string           not null
#  video_id   :integer          not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord

    validates :content, :video_id, :author_id, presence: true

    has_many :likes, as: :likeable

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :video,
        foreign_key: :video_id,
        class_name: :Video


    def is_edited?
        self.created_at != self.updated_at
    end

    def liker_ids
        self.likes.where(is_like: true).select(:liker_id).map { |ele| ele.liker_id }
    end

    def disliker_ids
        self.likes.where(is_like: false).select(:liker_id).map { |ele| ele.liker_id }
    end
    
end
