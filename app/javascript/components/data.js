
export const getArticles = async (term) => {
  const resp = await fetch(`https://newsapi.org/v2/everything?language=en&sortBy=popularity&q=${term}&pageSize=60`, {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'x-api-key' : 'b8b01da36f1c46458b933e9749635cd6'
  }
});

  const data = await resp.json();
  // const topHeadlines = await
  // data.then(()=>{console.log(term, data.articles);})
  // return convertToArray(data.articles);
  return convertToArray(data.articles);
}



const convertToArray = (articles) => {
  const arrayArticles = articles.map((el, index) => {
    return {
      title: el.title,
      author: el.author,
      description: el.description,
      url: el.url,
      image_url: el.urlToImage,
      content: el.content
    }
  })
  // console.log(arrayArticles);
  return arrayArticles;
}

// https://newsapi.org/v2/everything?language=en&sortBy=popularity&domains=smh.com.au&pageSize=60

// http://newsapi.org/v2/top-headlines?q=virus&country=us,au&pageSize=60

  // const initGetArticles = () => {
  // window.
