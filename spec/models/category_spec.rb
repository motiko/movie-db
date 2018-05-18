# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:category) }

    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to allow_values('Drama', 'Science Fiction').for(:name) }
  end
end
