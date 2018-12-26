class Users::SessionsController < Devise::SessionsController

  respond_to :json

  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    p render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token
    }
  end

  def destroy # Assumes only JSON requests
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    p render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token
    }
  end

end
