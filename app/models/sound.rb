class Sound < ApplicationRecord
    has_one_attached :soundfile
    has_many :sound_and_kits, dependent: :destroy
    has_many :kits, through: :sound_and_kits, dependent: :destroy
    default_scope { order(created_at: :asc) }
    accepts_nested_attributes_for :sound_and_kits, :kits
end
