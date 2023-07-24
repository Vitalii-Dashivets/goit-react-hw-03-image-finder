import axios from 'axios';

const API_KEY = '37137188-6bb810a50b61d3532d7744a01';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchData(searchValue, page) {
  const searchParams = new URLSearchParams({
    q: searchValue,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    oreintation: 'horizontal',
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return response.data.hits;
}

export { fetchData };
