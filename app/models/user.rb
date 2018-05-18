# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :movies, validate: false

  validates :email, length: { maximum: 200 }, presence: true, uniqueness: { case_sensitive: false }
end
