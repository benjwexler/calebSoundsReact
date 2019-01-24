class AddDefaultValueUserCart < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:users, :cart, "{}")
  end
end
