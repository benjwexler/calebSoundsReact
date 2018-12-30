class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :name
      t.integer :soundcloud_id
      t.date :release_date

      t.timestamps
    end
  end
end
