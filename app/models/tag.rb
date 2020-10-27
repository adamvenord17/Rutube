# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  tag_name   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord 

    validates :tag_name, presence: true

    has_many :tag_joins,
        foreign_key: :tag_id,
        class_name: :TagJoin

    has_many :videos,
        through: :tag_joins,
        source: :video
    
    def video_ids
        self.videos.map { |video| video.id }
    end
end
