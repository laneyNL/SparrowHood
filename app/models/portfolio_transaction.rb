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
  validates :symbol, :owner_id, :quantity, :transaction_price, presence: true
  validates :is_purchase, inclusion: { in: [true, false] }
  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: "User"

  belongs_to :asset
  before_validation :update_total

  def update_total()
    price = -self.quantity * self.transaction_price
    price = price.abs unless (self.is_purchase) 

    if (PortfolioTransaction.where(owner_id: self.owner_id)).last
      prev_price = PortfolioTransaction.where(owner_id: self.owner_id).last.current_total
    else
       prev_price = 0
    end

    self.current_total =  prev_price + price
  end
end
