# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:user) }
    it { is_expected.to have_secure_password }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  end
end
