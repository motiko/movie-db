class UserTokenController < Knock::AuthTokenController
  has_secure_password
end
