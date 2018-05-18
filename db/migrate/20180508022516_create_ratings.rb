# frozen_string_literal: true

class CreateRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.float :score, limit: 5, null: false
      t.belongs_to :user, index: true
      t.belongs_to :movie, index: true
      t.timestamps
    end
    add_index :ratings, %i[user_id movie_id], unique: true
  end
end
