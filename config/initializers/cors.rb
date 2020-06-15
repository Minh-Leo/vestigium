module Vestigium
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins ['https://www.vestigium.world','http://localhost:3000','https://newsapi.org/']
      resource '*', headers: :any, methods: :any
    end
  end
end
