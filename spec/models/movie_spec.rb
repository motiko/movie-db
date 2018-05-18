# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Movie, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:category) }
  it { is_expected.to have_many(:ratings) }

  describe 'calculated movie score' do
    let(:user) { FactoryBot.create(:user) }
    subject(:movie) { FactoryBot.create(:movie) }

    before { movie.rate_by!(user, 5) }

    it { expect(movie.ratings.average(:score)).to eq(movie.score) }
  end

  describe 'movie category' do
    subject(:movie) { FactoryBot.create(:movie) }

    context 'with existing category object' do
      let(:category) { FactoryBot.create(:category) }
      before { (movie.category_name = category.name) && movie.save }

      it { expect(movie.category_id).to eq(category.id) }
    end

    context 'with new category' do
      it { expect { (movie.category_name = Faker::Lorem.unique.word) && movie.save }.to change { Category.count }.by(1) }
    end
  end
end
