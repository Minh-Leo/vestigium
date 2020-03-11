class CreateFavoriteLists < ActiveRecord::Migration[5.2]
  def change
    create_table :favorite_lists do |t|
      t.references :list, foreign_key: true
      t.references :favorite, foreign_key: true

      t.timestamps
    end
  end
end
