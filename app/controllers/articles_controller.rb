class ArticlesController < ApplicationController
  before_action :set_article, only: %i[show]

  def new
    @article = Article.new
  end

  def show; end

  def index
    @articles = Article.all
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end
end
