class KitsController < ApplicationController
  before_action :set_kit, only: [:show, :edit, :update, :destroy]

  # GET /kits
  # GET /kits.json
  def index
    @kits = Kit.all
    

    respond_to do |format|
        
      format.html {
        p "HTML"
      }
      format.json { 
        p "JSON Kit"
        # render json: @kits.to_json 
        render json: @kits.map { |kit|
          kit.as_json.merge({ image: url_for(kit.cover_art) })
        }
      }
  end 
  end

  # GET /kits/1
  # GET /kits/1.json
  def show

    p "Hoobah"
    # @sounds = Sound.check_for_query(query)

    p query = request.query_string
    # @sounds = Track.check_for_query(query)

 
      p query_hash = CGI.parse(query) 
      limit = query_hash["limit"][0].to_i
      p offset = query_hash["offset"][0].to_i


      if query == "" || limit < 1
          @sounds = Sound.all
          sounds = @kit.sounds
      else
          sounds = @kit.sounds.limit(limit).offset(offset)  
      end 



    # @sounds = @kit.sounds

    # p @sounds

    # p request.format
    p "blah"


    respond_to do |format|

     
      format.json {
        # render json: @kit.sounds
        render json: sounds.map { |sound|
        p "What is going"
        p url_for(sound.soundfile)
          sound.as_json.merge({ soundfile: url_for(sound.soundfile), filename: sound.soundfile.blob.filename })
        }

       
      
      }
      format.html {
        # sound = Kit.find(10).sounds[0]

        # p url_for(sound.soundfile)
        @sounds = @kit.sounds

        @sounds.map { |sound|
       
          sound.as_json.merge({ soundfile: url_for(sound.soundfile), filename: sound.soundfile.blob.filename })
        }
       p @sounds
      }
    end 

  end

  # GET /kits/new
  def new
    @kit = Kit.new
    @kit.sounds.build
  end

  # GET /kits/1/edit
  def edit

  end

  # POST /kits
  # POST /kits.json
  def create
    p soundfiles = params["kit"]["folder"]

    sound_attributes_array = []

    i = 1

    soundfiles.each do |soundfile|

     soundfile_to_build = {
       name: params["kit"]["name"], 
      type_of_sound: params["kit"]["name"],
      description: params["kit"]["name"],
      key: params["kit"]["name"],
      tempo: i,
      soundfile: soundfile
    }

    sound_attributes_array.push(soundfile_to_build)

    end 

    new_kit_params = {
      kit: {
        name: params["kit"]["name"], 
        description: params["kit"]["description"], 
        price: params["kit"]["price"], 
        quantity_sold: 0,
        cover_art: params["kit"]["cover_art"],
        sounds_attributes: sound_attributes_array
        
      }
    }

    p @kit = Kit.new(new_kit_params[:kit])

    respond_to do |format|
      if @kit.save
        format.html { redirect_to @kit, notice: 'Kit was successfully created.' }
        format.json { render :show, status: :created, location: @kit }
      else
        format.html { render :new }
        format.json { render json: @kit.errors, status: :unprocessable_entity }
      end
    end

  end

  # PATCH/PUT /kits/1
  # PATCH/PUT /kits/1.json
  def update
    @kits = Kit.all
    p 'editizle'
    respond_to do |format|
      if @kit.update(kit_params)
        format.html { redirect_to @kit, notice: 'Kit was successfully updated.' }
        format.json { 
        render json: @kits.map { |kit|
            kit.as_json.merge({ image: url_for(kit.cover_art)})
          }
        }
      else
        format.html { render :edit }
        format.json { render json: @kit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kits/1
  # DELETE /kits/1.json
  def destroy
    # @kit.destroy
    # if SoundAndKit.all.where(sound_id: 135)
    # SoundAndKit.all.where(sound_id: 135).destroy_all

    sounds = @kit.sounds
    # conditional = SoundAndKit.all.where(sound_id: sound_id).length < 2
   
    
    p sounds

    sounds.each do |sound|

      p sound_id = sound.id
      p sound.id

      p "huba"
      # sound_id = sound.id
      # p sound_id
      p "SOUND ID"
      if SoundAndKit.all.where(sound_id: sound_id).length < 2
       
        # SoundAndKit.all.where(sound_id: sound_id).destroy_all
        # Sound.find(sound_id).destroy
        # blob_id = ActiveStorage::Attachment.where(record_type: "Sound", record_id: sound_id)[0].blob_id
        # ActiveStorage::Attachment.where(record_type: "Sound", record_id: sound_id).destroy_all
        # ActiveStorage::Blob.all.where(id: blob_id ).destroy_all
        Sound.find(sound_id).destroy
        p sound
        p "DELETED"
        p "plz hit"
      end

       
   end

   @kit.destroy

    respond_to do |format|
      format.html { redirect_to kits_url, notice: 'Kit was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_kit
      @kit = Kit.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def kit_params
      params.require(:kit).permit(:name, :description, :price, :cover_art, :quantity_sold, sound_and_kits_attributes: [:sound_id, :kit_id], sounds_attributes: [:name, :type_of_sound, :description, :key, :tempo, :soundfile])
    end
end
