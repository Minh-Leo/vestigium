class ListsController < ApplicationController
  def new
    @favorite = Favorite.find(params[:favorite_id])
    @list = List.new
  end

  def create
    @list = List.new
    @list.user = current_user
    @list.name = params["list"][:name]
    @list.save!
  end

  def edit
  end


  def update
  end

  def destroy
  end

  private

  def set_list
    @list = List.find(params[:id])
  end
end
