class Kit < ApplicationRecord
    has_many :sound_and_kits
    has_many :sounds, through: :sound_and_kits
    has_one_attached :cover_art
    accepts_nested_attributes_for :sound_and_kits, :sounds

    # def self.check_for_query(query)
    #     query_hash = CGI.parse(query) 
    #     limit = query_hash["limit"][0].to_i

    #     if query == "" || limit < 1
    #         return Track.all
    #     else
    #         return Track.order(release_date: :desc).with_attached_cover_art.limit(limit)    
    #     end 

    # end 

end
