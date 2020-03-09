
export const getArticles = async (term) => {
  const resp = await fetch(`https://newsapi.org/v2/everything?language=en&sortBy=popularity&q=${term}&pageSize=60`, {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'x-api-key' : process.env.NEWS_API
  }
});

  const data = await resp.json();
  return convertToArray(data.articles);
}

const convertToArray = (articles) => {
  const arrayArticles = articles.map((el, index) => {
    return {
      title: el.title,
      author: el.author,
      url: el.url,
      image_url: el.urlToImage,
      description: el.description,
      body: el.content,
      publish_time: el.publishedAt,
      source: el.source.name
    }
  })
  return arrayArticles;
}

// use in database analyzing
export const checkSourceName = (id) => {
  const sourceNames = ['abc-news-au', 'australian-financial-review', 'news-com-au', 'nbc-news', 'cnn', 'bloomberg', 'fox-news', 'espn', 'techradar', 'the-wall-street-journal', 'reuters', 'time', 'bbc-news', 'bbc-sport', 'independent'];
  return sourceNames[id - 1].toUpperCase();
}


// https://newsapi.org/v2/everything?language=en&sortBy=popularity&domains=smh.com.au&pageSize=60

// http://newsapi.org/v2/top-headlines?q=virus&country=us,au&pageSize=60
