# == Schema Information
#
# Table name: watchlist_assets
#
#  id           :bigint           not null, primary key
#  watchlist_id :integer          not null
#  symbol       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class WatchlistAsset < ApplicationRecord
  validates :watchlist_id, :symbol, presence: true
  validates :watchlist_id, uniqueness: { scope: :symbol}

  belongs_to :watchlist
end
