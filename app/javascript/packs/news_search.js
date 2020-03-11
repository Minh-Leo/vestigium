import { getArticles } from '../components/data';
import { create3Dglobe } from "../components/3Drenderers";

console.log('begin');

// const createButton = document.getElementById('create');
const searchButton = document.getElementById('submit-search-btn');
const searchForm = document.getElementById('search-field-div');
const searchField = document.getElementById('search-field');
const threeContainer = document.getElementById('three-container');
// const newsSectionContainer = document.getElementById('news-section');


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  threeContainer.innerHTML = '';
  console.log(searchField.value);
  getArticles(searchField.value).then(data => {
    create3Dglobe(data, 900);
  });
})
