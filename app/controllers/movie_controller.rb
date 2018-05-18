# frozen_string_literal: true

class MovieController < ApplicationController
  before_action :authenticate_user, except: [:index]
  before_action :find_movie, only: %i[update destroy rate]
  before_action :validate_movie_belongs_to_user, only: %i[update destroy]

  
  class AuthorizationError < StandardError; end

  rescue_from AuthorizationError do
    render json: { error: "User not authorized to perform this action on #{params[:id]}" }, status: :forbidden
  end

  rescue_from ActiveRecord::RecordInvalid do |ex|
    render json: { error: ex.record.errors.messages }, status: :unprocessable_entity
  end

  rescue_from ActiveRecord::RecordNotFound do |_e|
    render json: { error: "Record #{params[:id]} not found" }
  end

  def index
    @movies = Movie.with_category
    @movies = @movies.text_search(params[:query]) if params[:query].present?
    @movies = @movies.where(category_id: params[:categories]) if params[:categories].present?
    @movies = @movies.where("score >= ? ", params[:min_rating]) if params[:min_rating].present? 
    @movies = @movies.where("score <= ? ", params[:max_rating]) if params[:max_rating].present? 
    @movies = @movies.paginate(:page => params[:page] || 1, per_page: params[:per_page] ||  10)
    render json: { page: @movies.current_page,
      per_page:  @movies.per_page,
      total:  @movies.total_entries,
      movies:   @movies }.to_json
  end

  def create
    movie = Movie.new(title: params[:title], description: params[:description], user: current_user)
    movie.category_name = params[:category]
    movie.save!
    render json: { movie: movie }
  end

  def destroy
    @movie.destroy
    head :no_content
  end

  def update
    @movie.update(movie_params)
    head :no_content
  end

  def rate
    @movie.rate_by!(current_user, params[:score])
    head :no_content
  end

  private

  def movie_params
    params.permit(:title, :description)
  end

  def find_movie
    @movie = Movie.find(params[:id])
  end

  def validate_movie_belongs_to_user
    raise AuthorizationError if @movie.user != current_user
  end
end
