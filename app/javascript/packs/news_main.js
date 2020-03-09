import { getArticles } from '../components/data';
import { create3Dglobe } from "../components/3Drenderers";
import { analyze } from '../components/sentiment';
import { getCoordinates } from '../plugins/init_mapbox';
import nlp from 'compromise';

console.log('begin on main');

const searchButton = document.getElementById('submit-search-btn');
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
    let doc = nlp(`${el.body}`).match('#Place').text();

    // try catch here to catch exception in case there no location -> doesnt break the chain
    if (doc) {
      try {
        el.coordinates = await getCoordinates(doc);
      } catch (e) {
        console.log('no location');
      }
    }

    // console.log('in the loop', el);
    return el;
  }));
  console.log(articles);


  threeContainer.innerHTML = '';
  create3Dglobe(articles, radius);
}

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
