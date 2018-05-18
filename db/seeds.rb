# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
User.destroy_all
Category.destroy_all
Movie.destroy_all

users = User.create((1..3).map {|i| {email: "test#{i}@moviedb.com", password: '123123', password_confirmation: '123123'} })

categories = Category.create([{ name: 'Drama' }, { name: 'Action' }, { name: 'Comedy' }, { name: 'Documentary' }, { name: 'Romance' }, { name: 'Science Fiction' }])

Movie.create!((1..1000).map {|i| {user: users[rand(0..2)], category: categories[rand(0..5)], title: Faker::Book.title + " #{(i)} ", 
                                 description: Faker::Hipster.paragraphs.join("\n"), score: rand(1..5)} })
