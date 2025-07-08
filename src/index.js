import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import './styles.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function showError() {
  errorText.classList.remove('is-hidden');
}

function hideError() {
  errorText.classList.add('is-hidden');
}

function showCatInfo() {
  catInfo.classList.remove('is-hidden');
}

function hideCatInfo() {
  catInfo.classList.add('is-hidden');
}

function showSelect() {
  breedSelect.classList.remove('is-hidden');
}

function hideSelect() {
  breedSelect.classList.add('is-hidden');
}

hideSelect();
hideCatInfo();
hideError();
showLoader();

fetchBreeds()
  .then(breeds => {
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    new SlimSelect({ select: '.breed-select' });
    showSelect();
    hideLoader();
  })
  .catch(() => {
    hideLoader();
    showError();
    Notiflix.Notify.failure('Failed to load breeds. Try again.');
  });

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  showLoader();
  hideCatInfo();
  hideError();

  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data;
      const { name, description, temperament } = breeds[0];

      catInfo.innerHTML = `
        <img src="${url}" alt="${name}" width="400" />
        <div>
          <h2>${name}</h2>
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
        </div>
      `;
      showCatInfo();
      hideLoader();
    })
    .catch(() => {
      hideLoader();
      showError();
      Notiflix.Notify.failure('Failed to load cat data.');
    });
});
