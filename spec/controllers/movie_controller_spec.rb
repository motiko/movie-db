# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MovieController, type: :request do
  let(:content_headers) { { 'Content-type' => 'application/json' } }
  let(:user) { FactoryBot.create(:user) }
  let(:authorization_headers) { { 'Authorization' => "Bearer #{Knock::AuthToken.new(payload: { sub: user.id }).token}" } }
  let(:headers) { authorization_headers.merge(content_headers) }
  subject(:my_movie) { FactoryBot.create(:movie, user: user) }
  let(:not_my_movie) { FactoryBot.create(:movie) }

  describe 'GET /movie Lists movies' do
    before do
      FactoryBot.create_list(:movie, 5)
      get '/movie', headers: content_headers
    end
    subject(:movies) { JSON.parse(response.body)['movies'] }

    it 'Should return list of movies' do
      expect(response).to have_http_status(200)
      expect(movies.length).to eq(Movie.count)
    end
  end

  describe 'POST /movie Creates movie' do
    before { post '/movie', params: params.to_json, headers: headers }

    context 'Creates movie with valid parameters' do
      let(:params) { { 'title' => Faker::String.random, 'description' => Faker::String.random(500), 'category' => Faker::String.random } }
      subject(:response_movie) { JSON.parse(response.body)['movie'] }
      it { expect(response).to have_http_status(200) }
      it { expect(response_movie['title']).to eq(response_movie['title']) }
    end

    context 'Returns error for missing parameters' do
      let(:params) { { 'description' => Faker::String.random, 'category' => Faker::String.random } }

      it { expect(response).to have_http_status(422) }
    end
  end

  describe 'PATCH /movie/:id Updates a movie' do
    let(:params) { { 'title' => Faker::String.random } }
    before { patch "/movie/#{movie_id}", params: params.to_json, headers: headers }

    context 'User successfuly updates own movie' do
      let(:movie_id) { my_movie.id }
      it { expect(my_movie.reload.title).to eq(params['title']) }
    end

    context "User can't update someone else's movie" do
      let(:movie_id) { not_my_movie.id }
      it { expect(my_movie.reload.title).not_to eq(params['title']) }
      it { expect(response.body).to match(/not authorized/) }
    end

    context 'Returns error for invalid movie id' do
      let(:movie_id) { -1 }
      subject(:body) { JSON.parse(response.body) }
      it { expect(body['error']).to match(/not found/) }
    end
  end

  describe 'DELETE /movie/:id Removes a movie' do
    before { delete "/movie/#{movie_id}", headers: headers }

    context 'User successfuly deletes own movie' do
      let(:movie_id) { my_movie.id }
      it { expect(Movie.exists?(my_movie.id)).to be false }
    end

    context "User can't delete someone else's movie" do
      let(:movie_id) { not_my_movie.id }
      it { expect(Movie.exists?(my_movie.id)).to be true }
      it { expect(response.body).to match(/not authorized/) }
    end

    context 'Returns error for invalid movie id' do
      let(:movie_id) { -1 }
      subject(:body) { JSON.parse(response.body) }
      it { expect(body['error']).to match(/not found/) }
    end
  end

  describe 'PATCH /movie/:id/rate Adds a rating to movie (total rating should be recalculated)' do
    let(:params) { { 'score' => rand(1..5) } }
    before { patch "/movie/#{movie_id}", params: params.to_json, headers: headers }

    context 'User can rate own movie' do
      let(:movie_id) { my_movie.id }
      it { expect(my_movie.reload.score).to eq(my_movie.reload.ratings.average(:score)) }
    end

    context 'Can rate any movie' do
      let(:movie_id) { not_my_movie.id }
      it { expect(my_movie.reload.score).to eq(my_movie.reload.ratings.average(:score)) }
    end

    context 'Returns error for invalid movie id' do
      let(:movie_id) { -1 }
      subject(:body) { JSON.parse(response.body) }
      it { expect(body['error']).to match(/not found/) }
    end
  end

  describe 'Most actions require authorization' do
    context 'Authorized' do
      let(:headers) { authorization_headers.merge(content_headers) }

      describe 'POST /movie' do
        before { post '/movie', headers: headers }
        it { expect(response).not_to have_http_status(401) }
      end

      describe 'PATCH /movie/:id' do
        before { patch "/movie/#{my_movie.id}", headers: headers }
        it { expect(response).not_to have_http_status(401) }
      end

      describe 'DELETE /movie/:id' do
        before { delete "/movie/#{my_movie.id}", headers: headers }
        it { expect(response).not_to have_http_status(401) }
      end

      describe 'PATCH /movie/:id/rate' do
        before { patch "/movie/#{my_movie.id}/rate", headers: headers }
        it { expect(response).not_to have_http_status(401) }
      end
    end

    context 'Unauthorized' do
      let(:headers) { content_headers }

      describe 'POST /movie' do
        before { post '/movie', headers: headers }
        it { expect(response).to have_http_status(401) }
      end

      describe 'PATCH /movie/:id' do
        before { patch "/movie/#{my_movie.id}", headers: headers }
        it { expect(response).to have_http_status(401) }
      end

      describe 'DELETE /movie/:id' do
        before { delete "/movie/#{my_movie.id}", headers: headers }
        it { expect(response).to have_http_status(401) }
      end

      describe 'PATCH /movie/:id/rate' do
        before { patch "/movie/#{my_movie.id}/rate", headers: headers }
        it { expect(response).to have_http_status(401) }
      end
    end
  end
end
