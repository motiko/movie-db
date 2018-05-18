# frozen_string_literal: true

class CategoryController < ApplicationController
  include ActionController::Caching
  caches_action :index, expires_in: 1.hour
  
  def index
    render json: { categories: Category.all }.to_json
  end
end
