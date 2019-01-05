class AddCartToUserTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :cart, :text
  end
end
