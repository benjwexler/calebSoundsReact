class Users::SessionsController < Devise::SessionsController

  respond_to :json
  
  def new
  
    p "before?" 
    p sign_in_params
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    yield resource if block_given?

    
    respond_with(resource, serialize_options(resource))
  end

  def create
    require 'json'

    
    p request.headers['Authorization']
    p "Where diss" 
    p params
    p "wwwHuh"
    p auth_options
    p "Huh"
    # p self
    p self.resource = warden.authenticate!(auth_options)
    p "whahh"
    set_flash_message!(:notice, :signed_in)
    p sign_in(resource_name, resource)
    
    
    
    if block_given?
      p "sign in error test"
      yield resource 
    end 

    p current_user


    if current_user.cart != "{}"
      p "bloo"
    session[:temporary_cart] = JSON.parse current_user.cart
    end 


  
    p render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token,
        'cart' => current_user.cart
    }
  end

  def destroy # Assumes only JSON requests
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    p render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token,
        'cart' => session[:temporary_cart]
    }
  end

end
