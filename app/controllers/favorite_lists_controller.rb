class FavoriteListsController < ApplicationController
  def create
    # 1. create a new instance of FavoriteList.new
    @favorite_list = FavoriteList.new

    # 2. find the List using the params from form
    # 3. find the Favorite using the params from form
    @list = List.find(params["favorite_list"]["list_id"])
    @favorite = Favorite.find(params["favorite_list"]["favorite_id"])
    # 4. attach Favorite and List to @favorite_list
    @favorite_list.list = @list
    @favorite_list.favorite = @favorite
    # 5. save
    @favorite_list.save!
    # 6. redirect to dashboard path
    redirect_to dashboard_path
    raise
  end
end
