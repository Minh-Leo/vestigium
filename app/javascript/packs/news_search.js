import { getArticles } from '../components/data';
import { create3Dglobe } from "../components/3Drenderers";

console.log('begin');

const searchForm = document.getElementById('search-field-div');
const searchField = document.getElementById('search-field');
const threeContainer = document.getElementById('three-container');
const loadingScreen = document.getElementById('loading-screen');

searchForm.addEventListener('submit', (e) => {
  loadingScreen.style.display = 'block';
  e.preventDefault();
  threeContainer.innerHTML = '';
  console.log(searchField.value);
  getArticles(searchField.value).then(data => {
    create3Dglobe(data, 900);
    const favoriteButtons = document.querySelectorAll('.add-to-favorite');
    favoriteButtons.forEach(button => {
      button.style.display = 'none';
    });
    loadingScreen.style.display = 'none';
  });
})
