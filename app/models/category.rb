# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :movies, validate: false

  validates :name, length: { maximum: 200 }, presence: true, uniqueness: { case_sensitive: false }
end
