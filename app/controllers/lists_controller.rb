class ListsController < ApplicationController
  def new
    @favorite = Favorite.find(params[:favorite_id])
    @list = List.new
  end

  def create
    @list = List.new
    @list.user = current_user
    if params["list"][:name]
      @list.name = params["list"][:name]
    end
    if @list.save
      redirect_to dashboard_path
      flash.notice = "List saved!"
    else
      redirect_to dashboard_path
    end
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
