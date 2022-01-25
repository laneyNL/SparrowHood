# == Schema Information
#
# Table name: portfolio_transactions
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
class PortfolioTransaction < ApplicationRecord
  validates :asset_id, :owner_id, :quantity, :transaction_price, presence: true
  validates :is_purchase, inclusion: { in: [true, false] }
  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: "User"

  belongs_to :asset
end
