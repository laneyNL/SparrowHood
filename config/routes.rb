Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] 
    resource :session, only: [:create, :destroy]
    resources :users do
      resources :portfolio_transactions, only: [:index]
      resources :watchlist, only: [:index]
    end 
    resources :assets, only: [:show]
    resources :portfolio_transactions, only: [:create]
    resources :watchlist, only: [:show, :create, :destroy]
    resources :watchlist_assets, only: [:create, :destroy]
  end
end
