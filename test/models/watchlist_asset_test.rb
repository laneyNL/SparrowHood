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
require 'test_helper'

class WatchlistAssetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
