class SoundAndKit < ApplicationRecord
    validates :kit_id, uniqueness: { scope: :sound_id }
    belongs_to :kit, inverse_of: :sound_and_kits
    belongs_to :sound, inverse_of: :sound_and_kits
    has_one_attached :soundfile
end
