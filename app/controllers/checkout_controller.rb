class CheckoutController < ApplicationController

    def index
        p "checkout"
        p "Checkout Test"

        if current_user

            cart = current_user.cart
          else 
            cart = session[:temporary_cart].to_json
    
          end

        if cart == "{}"
            redirect_to root_path
        end 
    end
end