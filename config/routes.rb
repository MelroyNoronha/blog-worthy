# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  constraints(lambda { |req| req.format === :json }) do
    resources :posts, only: %i[index create show update], param: :slug
    resources :users, only: %i[index create]
    resources :organizations, only: %i[index]
    resource :session, only: %i[create destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
