class FavoritesController < ApplicationController
  before_action :set_favorite, only: %i[show edit]

  def new
    @article = Article.find(params[:article_id])
    @favorite = Favorite.new
  end

  def create
    @favorite.user = current_user
    @favorite.article = Article.find(params[:article_id])
    raise
  end

  def edit; end

  def show; end

  private

  def set_favorite
    @favorite = Favorite.find(params[:id])
  end
end
