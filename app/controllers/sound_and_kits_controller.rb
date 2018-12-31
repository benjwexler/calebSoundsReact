class SoundAndKitsController < ApplicationController
  before_action :set_sound_and_kit, only: [:show, :edit, :update, :destroy]

  # GET /sound_and_kits
  # GET /sound_and_kits.json
  def index
    @sound_and_kits = SoundAndKit.all
  end

  # GET /sound_and_kits/1
  # GET /sound_and_kits/1.json
  def show
  end

  # GET /sound_and_kits/new
  def new
    @sound_and_kit = SoundAndKit.new
  end

  # GET /sound_and_kits/1/edit
  def edit
  end

  # POST /sound_and_kits
  # POST /sound_and_kits.json
  def create
    @sound_and_kit = SoundAndKit.new(sound_and_kit_params)

    respond_to do |format|
      if @sound_and_kit.save
        format.html { redirect_to @sound_and_kit, notice: 'Sound and kit was successfully created.' }
        format.json { render :show, status: :created, location: @sound_and_kit }
      else
        format.html { render :new }
        format.json { render json: @sound_and_kit.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sound_and_kits/1
  # PATCH/PUT /sound_and_kits/1.json
  def update
    respond_to do |format|
      if @sound_and_kit.update(sound_and_kit_params)
        format.html { redirect_to @sound_and_kit, notice: 'Sound and kit was successfully updated.' }
        format.json { render :show, status: :ok, location: @sound_and_kit }
      else
        format.html { render :edit }
        format.json { render json: @sound_and_kit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sound_and_kits/1
  # DELETE /sound_and_kits/1.json
  def destroy
    @sound_and_kit.destroy
    respond_to do |format|
      format.html { redirect_to sound_and_kits_url, notice: 'Sound and kit was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sound_and_kit
      @sound_and_kit = SoundAndKit.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sound_and_kit_params
      params.require(:sound_and_kit).permit(:kit_id, :sound_id)
    end
end
