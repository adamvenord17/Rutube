# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  is_like?      :boolean          not null
#  liker_id      :integer          not null
#  likeable_type :string
#  likeable_id   :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Like < ApplicationRecord

    validates :liker_id, :likeable_type, :likeable_id, presence: true
    validates :is_like?, inclusion: { in: [true, false] }

    belongs_to :likeable, polymorphic: true

end
