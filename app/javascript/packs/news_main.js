import { getArticles } from '../components/data';
import { create3Dglobe } from "../components/3Drenderers";
import { analyze } from '../components/sentiment';
import { getCoordinates } from '../plugins/init_mapbox';
import nlp from 'compromise';

console.log('begin on main');

const searchButton = document.getElementById('submit-search-btn');
const colorButton = document.getElementById('onlyColor');
const negativeButton = document.getElementById('negative');
const neutralButton = document.getElementById('neutral');
const positiveButton = document.getElementById('positive');

const searchForm = document.getElementById('search-field-div');
const searchField = document.getElementById('search-field');
const threeContainer = document.getElementById('three-container');
const newsSectionContainer = document.getElementById('news-section');

// searchForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   let articles = dataJson.slice(0, 120);
//   threeContainer.innerHTML = '';
//   console.log(searchField.value);
//   create3Dglobe(articles, 1200);
// });

  // let articles = dataJson.length;
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


let coorObject = {};

const analyzingArticles = async () => {
  // Promise.all here bc the async from slice.map return an array of promises, and promise.all catch them all and wait for them to finish
  let articles = await Promise.all(dataJson.slice(0, 120).map( async (el, index) => {
    el.sentiment = analyze(`${el.title} ${el.description} ${el.body}`);
    let places = nlp(`${el.body}`).match('#Place').text();

    // try catch here to catch exception in case there no location -> doesnt break the chain
    if (places) {
      console.log(places);
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
}


// colorButton.addEventListener('click', () => {
//   const allArticles = document.querySelectorAll('.element');
//   console.log(allArticles.length);
//   allArticles.forEach(article => {
//     article.classList.toggle('onlyColor');
//   });
// });

const assignButton = (button, s) => {
  button.addEventListener('click', () => {
    let allArticles = document.querySelectorAll(`.element${s}`);
    console.log(allArticles.length);
    allArticles.forEach(article => {
      article.classList.toggle('onlyColor');
    });
  });
};
assignButton(colorButton, '');
assignButton(negativeButton, '.negative');
assignButton(neutralButton, '.neutral');
assignButton(positiveButton, '.positive');
// const showOnlyColor = () => {
//   allArticles.style.width = 'unset';
// };

analyzingArticles();


// dataJson.slice(0, 120).forEach( (el, index) => {
//     el.sentiment = analyze(`${el.title} ${el.description} ${el.body}`);
    // console.log(el.sentiment);
    // console.log(el.title);
    // console.log(el)
    // let doc = nlp(`${el.body}`);
    // let coor = await getCoordinates(doc.match('#Place').text());
    // console.log(coor, 'enddd', el.sentiment, index);
  // })


// const getAddress = () => {
//   let doc = nlp(`${el.body}`);
    // let coor = await getCoordinates(doc.match('#Place').text());
    // console.log(coor, 'enddd', el.sentiment, index);
// }
