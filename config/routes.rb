Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  get 'style-guide', to: 'pages#style_guide'
  get 'landing', to: 'pages#landing', as: 'landing'
  get 'dashboard', to: 'pages#dashboard', as: 'dashboard'
  get 'news_main', to: 'pages#news_main', as: 'news_main'
  get 'news_search', to: 'pages#news_search', as: 'news_search'

  resources :users, only: [:edit, :update, :show, :destroy]

  resources :lists, only: [:new, :create, :destroy, :edit, :update]

  resources :favorite_lists, only: :create

  resources :favorites, only: [:edit, :update, :destroy]

  resources :articles do
    resources :favorites, only: [:new, :create]
  end



end
