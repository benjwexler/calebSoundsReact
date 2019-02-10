class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.integer :kit_id
      t.float :price
      t.string :email

      t.timestamps
    end
  end
end
