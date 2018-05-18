# frozen_string_literal: true

class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates_uniqueness_of :movie, scope: :user
  validates :score, numericality: { greater_than: 0, less_than_or_equal_to: 5 }, presence: true
end
