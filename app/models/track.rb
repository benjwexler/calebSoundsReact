class Track < ApplicationRecord
    has_one_attached :cover_art

    def self.check_for_query(query)
        query_hash = CGI.parse(query) 
        limit = query_hash["limit"][0].to_i

        if query == "" || limit < 1
            return Track.all
        else
            return Track.order(release_date: :desc).limit(limit)    
        end 

    end 

end
