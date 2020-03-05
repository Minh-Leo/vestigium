
export const getArticles = async () => {
  const resp = await fetch('https://newsapi.org/v2/everything?language=en&sortBy=popularity&domains=smh.com.au&pageSize=60', {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'x-api-key' : 'b8b01da36f1c46458b933e9749635cd6'
  }
});
  const data = await resp.json();
  // console.log(data.articles);
  return convertToArray(data.articles);
}

const convertToArray = (articles) => {
  const arrayArticles = articles.map((el, index) => {
    return {
      title: el.title,
      description: el.description,
      url: el.url,
      image_url: el.urlToImage,
      content: el.content
    }
  })

  return arrayArticles;
}
