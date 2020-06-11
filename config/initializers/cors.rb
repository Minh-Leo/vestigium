module Vestigium
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins ['http://localhost:3000','https://newsapi.org/']
      resource '*', headers: :any, methods: :any
    end
  end
end
