class WelcomeController < ActionController::API

  def test
    render json: {hi: "you"}.to_json
  end

end
