require 'json'
require 'open-uri'

# `https://newsapi.org/v2/top-headlines?language=en&sortBy=popularity&pageSize=100`

# categories = %w[business entertainment general health science sports technology]

url = 'https://newsapi.org/v2/everything?language=en&from=2020-03-03&to=2020-03-04&sortBy=popularity&pageSize=70&page=1&sources='
api_key = "apiKey=#{ENV['NEWS_API']}"

sources = %w[abc-news-au australian-financial-review news-com-au google-news cnn bloomberg fox-news espn techradar the-wall-street-journal reuters time bbc-news bbc-sport independent]

puts 'begin'

# Sources only needed to be created once, comment out the code for sources created when the sources is created
sources.each do |source|
  Source.create!(name: source)
end
puts "sources created, size: #{Source.all.size}"
#

sources.each do |source|
  data = open("#{url}#{source}&#{api_key}").read
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



# AU :
# abc-news-au
# australian-financial-review
# google-news-au
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
