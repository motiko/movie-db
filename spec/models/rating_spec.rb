# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Rating, type: :model do
  describe 'validations' do
    subject(:rating) { FactoryBot.create(:rating) }
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:movie) }
    # it { is_expected.to validate_uniqueness_of(:movie).scoped_to(:user) } # Open issue https://github.com/thoughtbot/shoulda-matchers/issues/814
    it { is_expected.to validate_numericality_of(:score).is_less_than_or_equal_to(5).is_greater_than(0) }

    context 'with duplicate rating' do
      let(:dup) { rating.dup }
      it { expect { dup.save! }.to raise_error }
    end
  end
end
