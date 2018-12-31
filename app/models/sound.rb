class Sound < ApplicationRecord
    has_one_attached :soundfile
    has_many :sound_and_kits
    has_many :kits, through: :sound_and_kits
end
