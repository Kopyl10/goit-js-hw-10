import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');

breedSelect.classList.add('is-hidden');
catInfo.classList.add('is-hidden');
errorText.classList.add('is-hidden');
fetchBreeds()
  .then(breeds => {
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    new SlimSelect({ select: '.breed-select' });
    loader.classList.add('is-hidden');
    breedSelect.classList.remove('is-hidden');
  })
  .catch(() => {
    loader.classList.add('is-hidden');
    errorText.classList.remove('is-hidden');
    Notiflix.Notify.failure(
      'Oops! Something went wrong. Try reloading the page!'
    );
  });
breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;

  catInfo.classList.add('is-hidden');
  loader.classList.remove('is-hidden');
  errorText.classList.add('is-hidden');

  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data;
      catInfo.innerHTML = `
        <img src="${url}" alt="${breeds[0].name}" width="400" />
        <div>
          <h2>${breeds[0].name}</h2>
          <p>${breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${breeds[0].temperament}</p>
        </div>
      `;
      loader.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');
    })
    .catch(() => {
      loader.classList.add('is-hidden');
      errorText.classList.remove('is-hidden');
      Notiflix.Notify.failure('Oops! Something went wrong. Please try again.');
    });
});
