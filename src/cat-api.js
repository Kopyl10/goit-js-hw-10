import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_THluts3cFgBafrZV8IjjvtR711oMLX5OHdACUyRbdUwLoQgRtXjD95OlPRlZxQb5';
const BASE_URL = 'https://api.thecatapi.com/v1';
export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch breeds');
    });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw new Error('Failed to fetch cat data');
    });
}
