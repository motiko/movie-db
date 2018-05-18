# frozen_string_literal: true

class Movie < ApplicationRecord
  include PgSearch
  belongs_to :user, optional: true
  belongs_to :category, optional: true
  has_many :ratings

  pg_search_scope :text_search, against: %i(title description)
  
  validates :title, presence: true, uniqueness: { case_insensitive: true }, length: { maximum: 200 }

  scope :with_category, -> { left_joins(:category).select('categories.name as category_name').select(:title, :description, :score, :id, :user_id, :category_id) }

  def category_name=(category_name)
    self.category = Category.find_or_create_by(name: category_name)
  end

  def rate_by!(user, score)
    rating = ratings.find_or_initialize_by(user: user)
    rating.score = score
    rating.save!
    self.score = ratings.average(:score)
    save!
  end
end
