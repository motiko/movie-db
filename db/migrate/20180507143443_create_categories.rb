# frozen_string_literal: true

class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.text :name, null: false, unique: true, limit: 100

      t.timestamps
    end
  end
end
