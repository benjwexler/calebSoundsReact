class Kit < ApplicationRecord
    has_many :sound_and_kits
    has_many :sounds, through: :sound_and_kits
    has_one_attached :cover_art
    accepts_nested_attributes_for :sound_and_kits, :sounds
end
