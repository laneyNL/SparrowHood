# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string
#  last_name       :string
#  username        :string
#  password_digest :string
#  session_token   :string
#  buying_power    :float            default(0.0)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  attr_reader :password
  validates :first_name, :last_name, :username, :password_digest, :session_token, :buying_power, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    username.is_password?(password) ? user : nil
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
    @session_token ||= SecureRandom::urlsafe_base64(16)
  end

end
