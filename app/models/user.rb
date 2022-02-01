# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  buying_power    :float            default(0.0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  attr_reader :password
  validates :first_name, :last_name, :username, :password_digest, :session_token, :buying_power, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 10, allow_nil: true }
  after_initialize :ensure_session_token


  has_many :transactions,
  foreign_key: :owner_id,
  class_name: "PortfolioTransaction"

  has_many :watchlists

  has_many :watchlist_assets, through: :watchlists

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save
    self.session_token
  end

  private 

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

end
