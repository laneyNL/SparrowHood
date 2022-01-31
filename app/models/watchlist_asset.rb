# == Schema Information
#
# Table name: watchlist_assets
#
#  id           :bigint           not null, primary key
#  watchlist_id :integer
#  symbol       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class WatchlistAsset < ApplicationRecord
  validates :watchlist_id, :symbol, presence: true
  validates :watchlist_id, uniqueness: { scope: :symbol}

  belongs_to :watchlist
end
