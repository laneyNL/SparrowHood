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
    price = self.quantity * self.transaction_price
    owner = User.find_by(id: self.owner_id)
    lastTransaction = PortfolioTransaction.where(owner_id: self.owner_id).last
    lastTransaction ? prev_price = lastTransaction.current_total : prev_price = 0

    if (self.is_purchase)
      errors[:message] << 'Insufficent Funds' if (owner.buying_power < price)
    else
      # errors[:message] << 'Not Enough Shares' if (owner.quantity < self.quantity)
      price = -price.abs
    end

    owner.buying_power = owner.buying_power - price
    owner.save
    self.current_total =  prev_price + price
  end

end
