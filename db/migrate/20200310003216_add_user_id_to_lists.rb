class AddUserIdToLists < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :user_id, :integer
  end
end
