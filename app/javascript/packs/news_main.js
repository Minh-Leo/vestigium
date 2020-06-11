import { getArticles } from '../components/data';
import { create3Dglobe } from "../components/3Drenderers";
import { analyze } from '../components/sentiment';
import { getCoordinates } from '../plugins/init_mapbox';
import nlp from 'compromise';

console.log('begin on main');

const colorButton = document.getElementById('onlyColor');
const negativeButton = document.getElementById('negative');
const neutralButton = document.getElementById('neutral');
const positiveButton = document.getElementById('positive');

const threeContainer = document.getElementById('three-container');
const loadingScreen = document.getElementById('loading-screen');

let radius;
if (dataJson.length <= 20) {
  radius = 500;
} else if (dataJson.length <= 50) {
  radius = 700;
} else if (dataJson.length <= 90) {
  radius = 900;
} else {
  radius = 1200;
}

// let randomNews = dataJson.slice(0, 120);
const getRandom = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

const analyzingArticles = async () => {
  loadingScreen.style.display = 'block';

  // Promise.all here bc the async from slice.map return an array of promises, and promise.all catch them all and wait for them to finish
  let articles = await Promise.all(getRandom(dataJson, 120).map( async (el, index) => {
    el.sentiment = analyze(`${el.title} ${el.description} ${el.body}`);
    // console.log(el.sentiment, typeof(el.sentiment));
    let places = nlp(`${el.body}`).match('#Place').text();

    // try catch here to catch exception in case there no location -> doesnt break the chain
    if (places) {
      try {
        el.coordinates = await getCoordinates(places);
      } catch (e) {
        console.log('no location');
      }
    }
    return el;
  }));

  let map_articles = [];
  articles.forEach(el => {
      if (el.coordinates) {
        map_articles.push({ title: el.title, image_url:el.image_url, url: el.url, coor: el.coordinates });
      }
    });
  window.localStorage.setItem('myMapData', JSON.stringify(map_articles));

  threeContainer.innerHTML = '';
  create3Dglobe(articles, radius);
  loadingScreen.style.display = 'none';
}


const assignButton = (button, cName) => {
  button.addEventListener('click', () => {
    let allArticles = document.querySelectorAll(`.element${cName}`);
    // console.log(allArticles.length);
    allArticles.forEach(article => {
      article.classList.toggle('onlyColor');
    });
  });
};
assignButton(colorButton, '');
assignButton(negativeButton, '.negative');
assignButton(neutralButton, '.neutral');
assignButton(positiveButton, '.positive');

analyzingArticles();
