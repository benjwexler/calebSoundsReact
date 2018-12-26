class AddDefaultValueIsAdminUser < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:users, :isAdmin, false)
  end
end
