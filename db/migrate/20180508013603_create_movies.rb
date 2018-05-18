# frozen_string_literal: true

class CreateMovies < ActiveRecord::Migration[5.0]
  def change
    create_table :movies do |t|
      t.text :title, null: false, unique: true, limit: 200
      t.text :description
      t.float :score, limit: 5
      t.belongs_to :category, index: true
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
