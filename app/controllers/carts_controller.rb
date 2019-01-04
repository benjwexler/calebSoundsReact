class CartsController < ApplicationController

    def index

      respond_to do |format|
        format.json do
          render json: session[:temporary_cart].to_json
        end
      end
    end 

    def create

        if session[:temporary_cart] == nil
        p "???"
        session[:temporary_cart] = {}
        end 
  
      p kit_id = params[:kitId]
  
      if session[:temporary_cart][kit_id] == nil
        session[:temporary_cart][kit_id] = {
          quantity: 1,
          pic: params[:coverArtPic],
          timestamp: Time.now.to_i,
          price: params[:price],
          name: params[:name]
        }
        p "wtf"
      else 
        p new_amount = session[:temporary_cart][kit_id]["quantity"]
        new_amount +=1
        p "supposed to add"
        p session[:temporary_cart][kit_id][:quantity] = new_amount
      end 
      p session[:temporary_cart]
      request.session[:temporary_cart].each {|key, value| puts key.to_s + " --> " + value.to_s }
  
      respond_to do |format|
        format.json do
          render json: session[:temporary_cart].to_json
        end
      end

    end 

    def destroy
      p params[:id]
      p kit_id = params[:id]
      session[:temporary_cart].delete(kit_id)
      p request.session[:temporary_cart].each {|key, value| puts key.to_s + " --> " + value.to_s }
      
      respond_to do |format|
        format.json do
          render json: session[:temporary_cart].to_json
        end
      end 
    end



end 