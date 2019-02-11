class Users::RegistrationsController < Devise::RegistrationsController
    # before_action :configure_sign_in_params, only: [:create]
  
    p respond_to :json


    def create
        build_resource(sign_up_params)
    
        resource.save
        yield resource if block_given?
        if resource.persisted?
          if resource.active_for_authentication?
            set_flash_message! :notice, :signed_up
            sign_up(resource_name, resource)
            
            p render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token,
        'cart' => "{}"
    }
          else
            set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
            expire_data_after_sign_in!
            respond_with resource, location: after_inactive_sign_up_path_for(resource)
          end
        else

          p "errorTest"
          clean_up_passwords resource
          set_minimum_password_length

          p render :json => {
        'errorMessage' => "Sorry, Couldn't sign you up"
        }
        end
      end

      def edit
        p "Haha"
      end 
end