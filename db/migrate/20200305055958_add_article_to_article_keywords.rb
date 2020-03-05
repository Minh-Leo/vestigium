class AddArticleToArticleKeywords < ActiveRecord::Migration[5.2]
  def change
    add_reference :article_keywords, :article, foreign_key: true
  end
end
