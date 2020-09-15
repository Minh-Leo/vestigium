require 'json'
require 'open-uri'

url = 'https://newsapi.org/v2/everything?language=en&sortBy=popularity&pageSize=80&page=1&sources='
baseUrl = 'https://newsapi.org/v2/everything?language=en&sortBy=popularity&pageSize=80&page=1'

api_key = "apiKey=#{ENV['NEWS_API']}"
date = [['09','10'],['11','12'],['13', '14'],['15','16'],['17','18'],['19','20']]
# timeframe = 'from=2020-03-05&to=2020-03-07'

sources = %w[abc-news-au australian-financial-review news-com-au nbc-news cnn fox-news espn techradar the-verge the-wall-street-journal reuters time bbc-news bbc-sport independent]
domains = %w[smh.com.au 9news.com.au kotaku.com.au gamespot.com fool.com.au]

puts 'begin'

# List.destroy_all
# Favorite.destroy_all
# Article.destroy_all
# Source.destroy_all
# User.destroy_all

# Sources only needed to be created once, comment out the code for sources created when the sources is created
# sources.each do |source|
#   Source.create!(name: source)
# end
# domains.each do |domain|
#   Source.create!(name: domain)
# end
# puts "sources created, size: #{Source.all.size}"
#

# Destroy old articles
# Article.order('created_at ASC').limit(1000).destroy_all

date.each do |date|
  sources.each do |source|
    data = open("#{url}#{source}&from=2020-09-#{date[0]}&to=2020-09-#{date[1]}&#{api_key}").read
    json = JSON.parse(data)
    # this below is an array
    sourceTemp = Source.where(name: source)

    json['articles'].each do |article|
      artTemp = Article.new(
        title: article['title'],
        author: article['author'],
        url: article['url'],
        image_url: article['urlToImage'],
        description: article['description'],
        body: article['content'],
        publish_time: article['publishedAt'],
        )
      artTemp.source = sourceTemp[0]
      artTemp.save!
    end
    puts "articles from source #{source} done"
  end

  domains.each do |domain|
    data = open("#{baseUrl}&domains=#{domain}&from=2020-09-#{date[0]}&to=2020-09-#{date[1]}&#{api_key}").read
    json = JSON.parse(data)
    # this below is an array
    domainTemp = Source.where(name: domain)

    json['articles'].each do |article|
      artTemp = Article.new(
        title: article['title'],
        author: article['author'],
        url: article['url'],
        image_url: article['urlToImage'],
        description: article['description'],
        body: article['content'],
        publish_time: article['publishedAt'],
        )
      artTemp.source = domainTemp[0]
      artTemp.save!
    end
    puts "articles from domain #{domain} done"
  end
  puts "articles from #{date} done"
end


puts Article.all.size

puts 'End of seeding'
