Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, default: {Format: :json} do
    resources :users, only: %i(create show)
    resource :session, only: %i(create destroy)
  end

end
