class CreateArticleKeywords < ActiveRecord::Migration[5.2]
  def change
    create_table :article_keywords do |t|
      t.references :keywords, foreign_key: true
      t.references :articles, foreign_key: true

      t.timestamps
    end
  end
end
