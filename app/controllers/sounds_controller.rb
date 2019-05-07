class SoundsController < ApplicationController
  before_action :set_sound, only: [:show, :edit, :update, :destroy]

  # GET /sounds
  # GET /sounds.json
  def index
    @sounds = Sound.all

    # @sounds = @sounds.map { |sound|
    #     # p "What is going"
    #     # p url_for(sound.soundfile)
    #       sound.as_json.merge({ soundfile: url_for(sound.soundfile), filename: sound.soundfile.blob.filename })
    #     }
  end

  # GET /sounds/1
  # GET /sounds/1.json
  def show
    p id = @sound.soundfile.id
    p blob_id = ActiveStorage::Attachment.find(id).blob_id
    p ActiveStorage::Blob.find(blob_id)
  end

  # GET /sounds/new
  def new
    @sound = Sound.new
    @sound.sound_and_kits.build
  end

  # GET /sounds/1/edit
  def edit
  end

  # POST /sounds
  # POST /sounds.json
  def create

      sound_and_kit_to_build = {
        kit_id: params["sound"]["kit_id"].to_i
        }

        new_sound_params = {
      sound: {
        name: params["sound"]["name"], 
        type_of_sound: params["sound"]["type_of_sound"], 
        soundfile: params["sound"]["soundfile"], 
        sound_and_kits_attributes: [sound_and_kit_to_build]
        
      }
    }

    @sound = Sound.new(new_sound_params[:sound])

    respond_to do |format|
      if @sound.save
        format.html { redirect_to @sound, notice: 'Sound was successfully created.' }
        format.json { render :show, status: :created, location: @sound }
      else
        format.html { render :new }
        format.json { render json: @sound.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sounds/1
  # PATCH/PUT /sounds/1.json
  def update
    respond_to do |format|
      if @sound.update(sound_params)
        p @sound.soundfile.blob
        format.html { redirect_to @sound, notice: 'Sound was successfully updated.' }
        # format.json { render :show, status: :ok, location: @sound }
        format.json do
          render json: @sound.as_json.merge({ soundfile: url_for(@sound.soundfile), filename: @sound.soundfile.blob.filename })
        end
        
      else
        format.html { render :edit }
        format.json { render json: @sound.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sounds/1
  # DELETE /sounds/1.json
  def destroy
    @sound.destroy
    respond_to do |format|
      format.html { redirect_to sounds_url, notice: 'Sound was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sound
      @sound = Sound.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sound_params
      params.require(:sound).permit(:name, :type_of_sound, :description, :key, :tempo, :soundfile, 
      sound_and_kits_attributes: [ :id, :kit_id, :sound_id, :soundfile ],
      kits_attributes: [ :id, :kit_id ],
      )
    end
end
