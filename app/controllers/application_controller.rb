class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  def after_sign_in_path_for(user)
    landing_path
  end

end
