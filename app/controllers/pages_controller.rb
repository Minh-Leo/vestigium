class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :style_guide]

  def home
  end

  def style_guide
  end

  def landing
  end

  def dashboard
    @favorites = current_user.favorites.order(created_at: :desc)
    @lists = current_user.lists
    @favorite_lists = current_user.favorite_lists
  end

  def news_main
    @keywords = ['Covid', 'Italy', 'China', 'Wuhan', 'Corona', 'Election', 'Asx', 'Toilet paper', 'News']
    if params[:query].present?
      @articles = Article.search_by_title_and_description(params[:query]).to_json.html_safe
      # @articles = PgSearch.multisearch(params[:query])
    else
      @articles = Article.all.last(1000).to_json.html_safe
    end
  end

  def global_map
  end

  def news_search
  end
end
