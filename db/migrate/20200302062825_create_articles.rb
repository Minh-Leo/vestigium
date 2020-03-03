class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :description
      t.text :body
      t.string :url
      t.string :image_url
      t.string :publish_time
      t.integer :sentiment
      t.references :source
      t.float :latitude
      t.float :longitude
      t.jsonb :source_data

      t.timestamps
    end
  end
end
