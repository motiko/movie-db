# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_180_508_022_516) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'categories', force: :cascade do |t|
    t.text     'name',       null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'movies', force: :cascade do |t|
    t.text     'title', null: false
    t.text     'description'
    t.float    'score'
    t.integer  'category_id'
    t.integer  'user_id'
    t.datetime 'created_at',  null: false
    t.datetime 'updated_at',  null: false
    t.index ['category_id'], name: 'index_movies_on_category_id', using: :btree
    t.index ['user_id'], name: 'index_movies_on_user_id', using: :btree
  end

  create_table 'ratings', force: :cascade do |t|
    t.float    'score', null: false
    t.integer  'user_id'
    t.integer  'movie_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['movie_id'], name: 'index_ratings_on_movie_id', using: :btree
    t.index %w[user_id movie_id], name: 'index_ratings_on_user_id_and_movie_id', unique: true, using: :btree
    t.index ['user_id'], name: 'index_ratings_on_user_id', using: :btree
  end

  create_table 'users', force: :cascade do |t|
    t.text     'email', null: false
    t.text     'password_digest'
    t.datetime 'created_at',      null: false
    t.datetime 'updated_at',      null: false
    t.index ['email'], name: 'index_users_on_email', using: :btree
  end
end
