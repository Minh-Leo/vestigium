class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.string :note
      t.integer :user_sentiment
      t.references :user, foreign_key: true
      t.references :articles, foreign_key: true

      t.timestamps
    end
  end
end
