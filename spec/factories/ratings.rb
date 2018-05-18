# frozen_string_literal: true

FactoryBot.define do
  factory :rating do
    user { build(:user) }
    movie { build(:movie) }
    score { Faker::Number.between(1, 5) }
  end
end
