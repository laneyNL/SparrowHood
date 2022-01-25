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
class Asset < ApplicationRecord
  validates :name, :symbol, :current_price, presence: true
  validates :is_stock, inclusion: { in: [true, false] }

  has_many :transactions,
  foreign_key: :asset_id,
  class_name: "PortolioTransaction"
end
