class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :style_guide]

  def home
  end

  def style_guide
  end

  def landing
  end

  def dashboard
    @favorites = current_user.favorites
    @lists = current_user.lists
    @favorite_lists = current_user.favorite_lists
  end

  def news_main
    # @articles = Article.all.first(60).to_json.html_safe

    if params[:query].present?
      @articles = PgSearch.multisearch(params[:query]).to_json.html_safe
    else
      @articles = Article.all.to_json.html_safe
    end
  end

  def news_search
  end
end
