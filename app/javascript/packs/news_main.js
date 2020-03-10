import { getArticles } from '../components/data';
import { create3Dglobe } from "../components/3Drenderers";

console.log('begin on main');

const searchButton = document.getElementById('submit-search-btn');
const searchForm = document.getElementById('search-field-div');
const searchField = document.getElementById('search-field');
const threeContainer = document.getElementById('three-container');
const newsSectionContainer = document.getElementById('news-section');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let articles = dataJson.slice(0, 120);
  threeContainer.innerHTML = '';
  console.log(searchField.value);
  create3Dglobe(articles, 1200);
});