class RemoveArticlesFromFavorites < ActiveRecord::Migration[5.2]
  def change
    remove_column :favorites, :articles_id
  end
end
