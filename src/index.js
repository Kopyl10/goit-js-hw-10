import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './sass/index.scss';

import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';
const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.select.classList.add('is-hidden');
refs.error.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createSelectMarkup(data);
    new SlimSelect({
      select: '.breed-select',
    });
    refs.select.classList.remove('is-hidden');
  })
  .catch(onError)
  .finally(() => refs.loader.classList.add('is-hidden'));

refs.select.addEventListener('change', onBreedSelect);

function onBreedSelect(e) {
  const breedId = e.target.value;
  refs.catInfo.innerHTML = '';
  refs.loader.classList.remove('is-hidden');
  refs.catInfo.classList.add('is-hidden');
  refs.error.classList.add('is-hidden');

  fetchCatByBreed(breedId)
    .then(cat => {
      refs.catInfo.innerHTML = createCatMarkup(cat);
      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(onError)
    .finally(() => refs.loader.classList.add('is-hidden'));
}

function createSelectMarkup(breeds) {
  return breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function createCatMarkup(catData) {
  const { url, breeds } = catData;
  const { name, description, temperament } = breeds[0];

  return `
    <div class="cat-card">
      <img src="${url}" alt="${name}" />
      <div class="cat-text">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
      </div>
    </div>
  `;
}

function onError(error) {
  Notiflix.Notify.failure(
    'Oops! Something went wrong. Try reloading the page!'
  );
  refs.error.classList.remove('is-hidden');
  refs.select.classList.add('is-hidden');
}
