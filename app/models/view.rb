# == Schema Information
#
# Table name: views
#
#  id         :bigint           not null, primary key
#  video_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ip_address :string           not null
#
class View < ApplicationRecord 

    validates :video_id, :ip_address, presence: true

end
