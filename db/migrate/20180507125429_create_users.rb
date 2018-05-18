# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.text :email, unique: true, null: false, index: true, limit: 200
      t.text :password_digest

      t.timestamps
    end
  end
end
