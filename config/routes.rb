Rails.application.routes.draw do

  resources :transactions
  get 'checkout', to: 'checkout#index'
  
  resources :sound_and_kits
  resources :charges
  resources :sounds
  resources :kits
  resources :tracks
  resources :carts
  devise_for :users, controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations'
      }

      devise_scope :user do
        get 'sign_in', to: 'users/sessions#new'
        post 'sign_out', to: 'users/sessions#destroy'
      end
  resources :users
  get 'hello_world', to: 'hello_world#index'

  # get 'carts', to: 'carts#index'

  root to: "users#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
