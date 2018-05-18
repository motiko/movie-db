# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::String.random(8..36) }
    password_confirmation { password }
  end
end
