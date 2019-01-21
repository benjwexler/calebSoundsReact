class CartsController < ApplicationController

    def index

      if current_user

        cart = current_user.cart
      else 
        cart = session[:temporary_cart].to_json

      end

    

      respond_to do |format|
        format.json do
          render json: cart 
        end
      end
    end 

    def create
      
      p "luana"
      # p params = eval(params)



      p kit_id = params[:kitId]
      p "Blah"
      p session[:temporary_cart]



        if session[:temporary_cart] == nil
        session[:temporary_cart] = {}
        end 
  
     
  
      if session[:temporary_cart][kit_id] == nil
        p "Hitting this?"
        session[:temporary_cart][kit_id] = {
          quantity: 1,
          pic: params[:coverArtPic],
          timestamp: Time.now.to_i,
          price: params[:price],
          name: params[:name]
        }
      else 
        # p "Hitting this?"
        p new_amount = session[:temporary_cart][kit_id]["quantity"]
        new_amount +=1
        p session[:temporary_cart][kit_id][:quantity] = new_amount
      end 
      request.session[:temporary_cart].each {|key, value| puts key.to_s + " --> " + value.to_s }


      if current_user
        current_user.update_attribute(:cart, session[:temporary_cart].to_json)
      end 
  
      respond_to do |format|
        format.json do
          render json: session[:temporary_cart].to_json
        end
      end
  

    end 

    def destroy
      p params[:id]
      if params[:id] != "all"
      p kit_id = params[:id]
      session[:temporary_cart].delete(kit_id)
      p request.session[:temporary_cart].each {|key, value| puts key.to_s + " --> " + value.to_s }
      else
        session[:temporary_cart] = {}
      end

      if current_user
        current_user.update_attribute(:cart, session[:temporary_cart].to_json)
      end 
      
      respond_to do |format|
        format.json do
          render json: session[:temporary_cart].to_json
        end
      end 
    end



end 