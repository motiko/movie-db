# frozen_string_literal: true

FactoryBot.define do
  factory :movie do
    title { Faker::Book.unique.title }
    description { Faker::HitchhikersGuideToTheGalaxy.quote }
    user { FactoryBot.create(:user) }

    trait :categorized do
      category { FactoryBot.create(:category) }
    end
  end
end
