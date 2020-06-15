
// const axios = require('axios');

// const url = `${proxyUrl}https://newsapi.org/v2/everything?qInTitle=${qInTitle}&from=${from}language=en&apiKey=${apiKey}`;

export const getArticles = async (term) => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"

  const apiKey = process.env.NEWS_API;
  const url = `${proxyUrl}https://newsapi.org/v2/everything?language=en&sortBy=popularity&q=${term}&pageSize=60&apiKey=${apiKey}`;
  const request = new Request(url);

  const resp = await fetch(request).then(data => data.json());

//   const resp = await fetch(`${proxyUrl}https://newsapi.org/v2/everything?language=en&sortBy=popularity&q=${term}&pageSize=60`, {
//   method: 'GET',
//   mode: 'cors',
//   cache: 'no-cache',
//   headers: {
//     'x-api-key' : process.env.NEWS_API,
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type, x-api-key, Access-Control-Allow-Headers, Authorization, X-Requested-With',
//   }
// }).then(data => console.log(data));

  // const resp = await axios({
  //   method: 'get',
  //   url: `${proxyUrl}https://newsapi.org/v2/everything?language=en&sortBy=popularity&q=${term}&pageSize=60`,
  //   headers: {
  //     'x-api-key' : process.env.NEWS_API,
  //   }
  // });

  const data = await resp.articles;
  return convertToArray(data);
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
  const sourceNames = ['abc-news-au', 'australian-financial-review', 'news-com-au', 'nbc-news', 'cnn', 'bloomberg', 'fox-news', 'espn', 'techradar', 'the-wall-street-journal', 'reuters', 'time', 'bbc-news', 'bbc-sport', 'independent', 'smh.com.au', '9news.com.au', 'kotaku.com.au', 'gamespot.com', 'fool.com.au'];
  return sourceNames[id - 1].toUpperCase();
}


// https://newsapi.org/v2/everything?language=en&sortBy=popularity&domains=smh.com.au&pageSize=60

// http://newsapi.org/v2/top-headlines?q=virus&country=us,au&pageSize=60
