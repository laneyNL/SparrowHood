# == Schema Information
#
# Table name: assets
#
#  id            :bigint           not null, primary key
#  name          :string
#  symbol        :string
#  is_stock      :boolean
#  current_price :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require 'test_helper'

class AssetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
