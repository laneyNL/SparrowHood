# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Watchlist < ApplicationRecord
  validates :user_id, :name, :icon, presence: true
  validates :name, uniqueness: { scope: :user_id }
  
  belongs_to :user

  has_many :assets,
  class_name: "WatchlistAsset",
  dependent: :destroy


end
