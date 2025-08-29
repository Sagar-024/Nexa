
import axios from 'axios';

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const PIXABAY_URL = 'https://pixabay.com/api/';

export async function fetchPixabayImages(query, perPage = 10) {
  const { data } = await axios.get(PIXABAY_URL, {
    params: {
      key: PIXABAY_API_KEY,
      q: query,
      image_type: 'photo',
      per_page: perPage,
      safesearch: true,
    }
  });

  return data.hits.map(img => ({
    id: img.id,
    imageUrl: img.webformatURL,
    largeImageUrl: img.largeImageURL,
    description: img.tags,
    photographer: img.user,
    photographerProfile: `https://pixabay.com/users/${img.user}-${img.user_id}/`
  }));
}
