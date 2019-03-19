class ChargesController < ApplicationController

    def new
    p "ndijnik"
    
    end 

    def create
        p "blah"
      p source = params[:id]
      p email = params[:email]
      p amount = params[:amount].to_i
      user_id = params[:userId].to_i
      kit_id = params[:kitId].to_i
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

    # rescue Stripe::CardError => e
    #     flash[:error] = e.message
    #     redirect_to new_charge_path
    # end 

    new_transaction_params = {
          user_id: user_id, 
          kit_id: kit_id, 
          price: amount,
          email: email
          

      }
  
      p @transaction = Transaction.new(new_transaction_params)
      p "What the fuck"
    #   @transaction = Transaction.new(transaction_params)

    # respond_to do |format|
      if @transaction.save

        p "this is a test"
        # format.html { redirect_to @transaction, notice: 'Transaction was successfully created.' }
        # format.json { render :show, status: :created, location: @transaction }
        render json: {message: "Thanks for your purchase. Your stickers are on the way!"}
    #   else
    #     format.html { render :new }
    #     format.json { render json: @transaction.errors, status: :unprocessable_entity }
    #   end
    end

    

    
    end 
end
