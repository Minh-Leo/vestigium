class FavoritesController < ApplicationController
  before_action :set_favorite, only: %i[show edit destroy update]

  def new
    @article = Article.find(params[:article_id])
    @favorite = Favorite.new
    # flash.notice = "Added to favorites."
  end

  def create
    @favorite = Favorite.new
    @favorite.user = current_user
    @favorite.article = Article.find(params[:article_id])
    @favorite.save!
    flash.notice = "Favorite saved!"
    redirect_to dashboard_path
  end

  def update
    @favorite.update(favorite_params)
    # redirect_to dashboard_path
  end

  def edit; end

  def show; end

  def destroy
    @favorite.destroy
    redirect_to dashboard_path
  end

  private

  def favorite_params
    params.permit(:note)
  end

  def set_favorite
    @favorite = Favorite.find(params[:id])
  end
end
