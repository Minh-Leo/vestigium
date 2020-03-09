class FavoritesController < ApplicationController
  before_action :set_favorite, only: %i[show edit destroy]

  def new
    @article = Article.find(params[:article_id])
    @favorite = Favorite.new
  end

  def create
    @favorite = Favorite.new
    @favorite.user = current_user
    @favorite.article = Article.find(params[:article_id])
    @favorite.save!
    redirect_to dashboard_path
  end

  def edit; end

  def show; end

  def destroy
    @favorite.destroy
  end

  private

  def set_favorite
    @favorite = Favorite.find(params[:id])
  end
end
