Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  get 'style-guide', to: 'pages#style_guide'
  get 'landing', to: 'pages#landing', as: 'landing'
  get 'news_main', to: 'pages#news_main', as: 'news_main'

  resources :users, only: [:edit, :update, :show, :destroy]


  resources :favorites, only: [:edit, :update, :destroy]

  resources :articles do
    resources :favorites, only: [:new, :create]
  end



end
