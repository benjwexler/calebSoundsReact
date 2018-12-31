class CreateSoundAndKits < ActiveRecord::Migration[5.2]
  def change
    create_table :sound_and_kits do |t|
      t.integer :kit_id
      t.integer :sound_id

      t.timestamps
    end
  end
end
