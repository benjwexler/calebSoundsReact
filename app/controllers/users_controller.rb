class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index

    respond_to do |format| 
      format.html {
        @users = User.all

        p current_user

        @user_id = nil  


        if current_user 
          p  @user_id = current_user.id
        end 

        render :index 
        p "BLAH"
      }
      format.json { 
       
        render json: {}
      }
    end 

  end

  # GET /users/1 
  # GET /users/1.json
  def show

    p params 
    # p @user
    

    respond_to do |format|
        
      format.html {
        if !current_user || params[:id].to_i != current_user.id
          redirect_to root_path
        else
          @user = current_user
          @user_id = current_user.id
          @relative_path = request.original_url
        end
      }
      format.json { 

        @user_id = nil 
        @user_email = nil 


        if current_user 
          p  @user_id = current_user.id
            @user_email = current_user.email 
        end 

      
       
        render json: {user_id:  @user_id, user_email: @user_email}
      }
  end 
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
    p current_user
    current_user.update_attribute(:cart, session[:temporary_cart].to_json)
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      
      # begin
      if params[:id] != "x"
        @user = User.find(params[:id])
      end 
      # rescue 
      #   # redirect_to root_path
      #   @user = nil 
      # end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :isAdmin)
    end
end
