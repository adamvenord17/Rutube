# == Schema Information
#
# Table name: tag_joins
#
#  id         :bigint           not null, primary key
#  video_id   :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TagJoin < ApplicationRecord

    validates :video_id, :tag_id, presence: true
    validates :video_id, uniqueness: { scope: :tag_id }

    belongs_to :video

    belongs_to :tag

end
