class KeywordsController < ApplicationController
  def new
    @keyword = Keyword.new
  end

  def index
    @keywords = Keyword.all
  end
end
