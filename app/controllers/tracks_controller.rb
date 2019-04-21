class TracksController < ApplicationController
  before_action :set_track, only: [:show, :edit, :update, :destroy]

  # GET /tracks
  # GET /tracks.json
  def index

    # if !current_user || !current_user.isAdmin
    #   redirect_to root_path
    # end 
    query = request.query_string
    p @tracks = Track.check_for_query(query)

    p request.format 

    respond_to do |format|
        
        format.html {
        }
        format.json { 
          p "JSON Track"
          # render json: @tracks.to_json 
          render json: @tracks.map { |track|
            track.as_json.merge({ image: url_for(track.cover_art), isPlaying: false })
          }
        }
    end 
    
  end

  # GET /tracks/1
  # GET /tracks/1.json
  def show
  
  end

  # GET /tracks/new
  def new
    @track = Track.new

    if !current_user || !current_user.isAdmin
      redirect_to root_path
    elsif !current_user.isAdmin
      redirect_to root_path
    end 
  end

  # GET /tracks/1/edit
  def edit
    @track = @track.attributes.merge({ "image": url_for(@track.cover_art)})
  
    p @track[:image]
# @track["image"] = "Blah"
  # p url_for(@track.cover_art)

  

  # p @track.attributes
  # @track.name = "Blah"

#   respond_to do |format|
        
#     format.html {
#       p "HTML"
#       @track.merge({ image2: url_for(@track.cover_art)})
#     }
#     format.json { 
#       p "JSON Track"
    
#     }
# end 

  end

  # POST /tracks
  # POST /tracks.json
  def create
    @track = Track.new(track_params)

    respond_to do |format|
      if @track.save
        format.html { redirect_to @track, notice: 'Track was successfully created.' }
        format.json { render :show, status: :created, location: @track }
      else
        format.html { render :new }
        format.json { render json: @track.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tracks/1
  # PATCH/PUT /tracks/1.json
  def update
    @tracks = Track.all
    respond_to do |format|
      if @track.update(track_params)
        p "Option A"
        format.html { redirect_to @track, notice: 'Track was successfully updated.' }
        # format.json { render :show, status: :ok, location: @track }
        format.json { 
          p "JSON Track"
          # render json: @tracks.to_json 
          render json: @tracks.map { |track|
            track.as_json.merge({ image: url_for(track.cover_art), isPlaying: false })
          }
        }
      else
        p "Option B"
        format.html { render :edit }
        format.json { render json: @track.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tracks/1
  # DELETE /tracks/1.json
  def destroy
    @tracks = Track.all
    @track.destroy
    respond_to do |format|
      format.html { redirect_to tracks_url, notice: 'Track was successfully destroyed.' }
      format.json { 
          p "JSON Track"
          # render json: @tracks.to_json 
          render json: @tracks.map { |track|
            track.as_json.merge({ image: url_for(track.cover_art), isPlaying: false })
          }
        }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_track
      @track = Track.find(params[:id])
    
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def track_params
      params.require(:track).permit(:name, :soundcloud_id, :release_date, :cover_art, :spotify_url, :soundcloud_url, :apple_music_url, :youtube_url)
    end
end
