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

    has_one_attached :video_file

end
