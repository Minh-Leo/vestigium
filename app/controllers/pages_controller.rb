class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :style_guide]

  def home
  end

  def style_guide
  end

  def landing
  end

  def news_main
    # @articles = Article.all.first(60).to_json.html_safe
    # @articles = Article.all.to_json.html_safe

    if params[:query].present?
      @articles = PgSearch.multisearch(params[:query]).to_json.html_safe
    else
      @articles = Article.all.to_json.html_safe
    end

  end
end
