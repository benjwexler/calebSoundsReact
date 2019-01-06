class ChargesController < ApplicationController

    def new
    p "ndijnik"
    
    end 

    def create
        p "blah"
      p source = params[:id]
      p email = params[:email]
      p amount = params[:amount].to_i
      p "blah"

      customer = Stripe::Customer.create(
        :email => email,
        :source  => source
    )

    charge = Stripe::Charge.create(
        :customer    => customer.id,
        :amount      => amount,
        :description => 'Rails Stripe customer',
        :currency    => 'usd'
    )

    render json: {message: "Thanks for your purchase. Your stickers are on the way!"}
    end 
end
