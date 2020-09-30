# == Schema Information
#
# Table name: views
#
#  id         :bigint           not null, primary key
#  video_id   :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class View < ApplicationRecord 

    validates :video_id, :user_id, presence: true

end
