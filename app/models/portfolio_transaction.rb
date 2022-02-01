# == Schema Information
#
# Table name: portfolio_transactions
#
#  id                :bigint           not null, primary key
#  owner_id          :integer          not null
#  is_purchase       :boolean          not null
#  quantity          :float            not null
#  transaction_price :float            not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  current_total     :float            default(0.0), not null
#  symbol            :string           not null
#
class PortfolioTransaction < ApplicationRecord
  validates :symbol, :owner_id, :quantity, :transaction_price, presence: true
  validates :is_purchase, inclusion: { in: [true, false] }
  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: "User"

  validate :update_total

  def self.in_interval(owner_id, interval)
    case interval
      when 'Today'
        days_ago = 1.day.ago
      when 'Past Week'
        days_ago = 7.day.ago
      when 'Past Month'
        days_ago = 30.day.ago
      when 'Past 3 Months'
        days_ago = 90.day.ago
      when 'Past Year'
        days_ago = 365.day.ago
      else
        return PortfolioTransaction.where(owner_id: owner_id)
    end
    PortfolioTransaction.where(owner_id: owner_id).where("created_at > ?", days_ago)
  end

  def update_total
    return errors[:base] << 'Please enter a valid amount' if (self.quantity.nil? || self.quantity == 0)
    price = self.quantity * self.transaction_price
    owner = User.find_by(id: self.owner_id)
    lastTransaction = PortfolioTransaction.where(owner_id: self.owner_id).last
    lastTransaction ? prev_price = lastTransaction.current_total : prev_price = 0
    quantityOwned =  PortfolioTransaction.where(owner_id: self.owner_id, symbol: self.symbol).sum(:quantity)
    if (quantity > 0)
      return errors[:base] << 'Not Enough Buying Power' if (owner.buying_power < price)
    else
      return errors[:base] << 'Not Enough Shares' if (quantityOwned < -self.quantity)
    end

    owner.buying_power = owner.buying_power - price
    owner.save
    self.current_total =  prev_price + price
  end

end
