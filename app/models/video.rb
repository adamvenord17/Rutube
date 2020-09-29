# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  body        :string
#  uploader_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord

    validates :title, :uploader_id, presence: true

    belongs_to :uploader,
        foreign_key: :uploader_id,
        class_name: :User

    has_many :likes, as: :likeable

    has_one_attached :video_file

    def liker_ids
        self.likes.where(is_like: true).select(:liker_id).map { |ele| ele.liker_id }
    end

    def disliker_ids
        self.likes.where(is_like: false).select(:liker_id).map { |ele| ele.liker_id }
    end

end
