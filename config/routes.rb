Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] 
    resource :session, only: [:create, :destroy]
    resources :users do
      resources :portfolio_transactions, only: [:index]
      resources :watchlists, only: [:index]
    end 
    resources :assets, only: [:show]
    resources :portfolio_transactions, only: [:create]
    resources :watchlists, only: [:show, :create, :destroy, :update]
    resources :watchlist_assets, only: [:create, :destroy]
  end
end
