class ChangeUserCartTypeToJson < ActiveRecord::Migration[5.2]
  change_column :users, :cart, :json, using: 'cart::json'
end
