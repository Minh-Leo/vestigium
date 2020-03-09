require 'json'
require 'open-uri'

url = 'https://newsapi.org/v2/everything?language=en&sortBy=popularity&pageSize=80&page=1&sources='
api_key = "apiKey=#{ENV['NEWS_API']}"
timeframe = 'from=2020-03-05&to=2020-03-07'

sources = %w[abc-news-au australian-financial-review news-com-au nbc-news cnn bloomberg fox-news espn techradar the-wall-street-journal reuters time bbc-news bbc-sport independent]

puts 'begin'

# Sources only needed to be created once, comment out the code for sources created when the sources is created
sources.each do |source|
  Source.create!(name: source)
end
puts "sources created, size: #{Source.all.size}"
#

sources.each do |source|
  data = open("#{url}#{source}&#{timeframe}&#{api_key}").read
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

puts 'End of seeding'

# `https://newsapi.org/v2/top-headlines?language=en&sortBy=popularity&pageSize=100`

# categories = %w[business entertainment general health science sports technology]

# AU :
# abc-news-au
# australian-financial-review
# google-news-au  <-- dont use this
# news-com-au
# US:
# abc-news
# bloomberg
# business-insider
# buzzfeed
# cnn
# espn
# fox-news
# google-news
# nbc-news
# reuters
# techradar
# the-verge
# the-wall-street-journal
# time
# GB:
# bbc-news
# bbc-sport
# google-news-uk
# independent
