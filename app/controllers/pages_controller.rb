class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :style_guide]

  def home
  end

  def style_guide
  end

  def landing
  end

  def news_main
  end
end
