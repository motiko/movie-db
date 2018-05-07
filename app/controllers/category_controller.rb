class CategoryController < ApplicationController
  def index
    render json: {categories: Category.all}.to_json
  end
end
