# == Schema Information
#
# Table name: portolio_transactions
#
#  id                :bigint           not null, primary key
#  asset_id          :integer
#  owner_id          :integer
#  is_purchase       :boolean
#  quantity          :float
#  transaction_price :float
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
require 'test_helper'

class PortolioTransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
