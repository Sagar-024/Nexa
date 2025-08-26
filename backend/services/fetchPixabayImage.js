import axios from "axios";

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

export async function fetchPixabayImage(query1, query2 = "") {
  const query = query1 + (query2 ? `, ${query2}` : "");

  try {
    const res = await axios.get("https://pixabay.com/api/", {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal", // landscape images
        per_page: 1,
        safesearch: true
      }
    });

    const photo = res.data.hits[0];
    if (!photo) return {};
    return {
      imageUrl: photo.webformatURL,                             // Main image (good size for most use)
      photographerName: photo.user,                             // Username of uploader
      photographerUrl: photo.pageURL,                           // URL to the image's Pixabay page
      profileImage: photo.userImageURL,                         // User's profile icon
      pixabayUrl: photo.pageURL                                 // Same as photographerUrl (put for consistency)
    };
  } catch (err) {
    console.error("Pixabay error:", err.response?.data || err.message);
    return {};
  }
}
