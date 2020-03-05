class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  def after_sign_in_path_for(user)
    news_main_path
  end

end
