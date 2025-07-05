import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_MtZ5zjj50Bxm1o0nIM2YzqCLOUbh8x9CbK6ZifPkp7ArRWdYOJishL2xCh8NZayv';
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
