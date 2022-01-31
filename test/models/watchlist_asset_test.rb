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
require 'test_helper'

class WatchlistAssetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
