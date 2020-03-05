class RemoveArticlesFromArticleKeywords < ActiveRecord::Migration[5.2]
  def change
     remove_column :article_keywords, :articles_id
  end
end
