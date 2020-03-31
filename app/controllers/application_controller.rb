class ApplicationController < ActionController::Base
  add_flash_types :info, :error, :warning

  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def after_sign_in_path_for(user)
    news_main_path
  end

end
