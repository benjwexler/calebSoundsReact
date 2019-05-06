class SoundAndKit < ApplicationRecord
    validates :kit_id, uniqueness: { scope: :sound_id }
    belongs_to :kit
    belongs_to :sound
    has_one_attached :soundfile
end
