class AddArticleToFavorites < ActiveRecord::Migration[5.2]
  def change
    add_reference :favorites, :article, foreign_key: true
  end
end
