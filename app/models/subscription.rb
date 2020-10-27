# == Schema Information
#
# Table name: subscriptions
#
#  id            :bigint           not null, primary key
#  creator_id    :integer          not null
#  subscriber_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Subscription < ApplicationRecord

    validates :creator_id, :subscriber_id, presence: true
    validates :creator_id, uniqueness: { scope: :subscriber_id }

    belongs_to :creator,
        foreign_key: :creator_id,
        class_name: :User

    belongs_to :subscriber,
        foreign_key: :subscriber_id,
        class_name: :User

end
