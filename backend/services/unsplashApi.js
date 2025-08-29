import axios from "axios";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function fetchUnsplashImage(query1, query2 = "") {
  const query = query1 + (query2 ? `, ${query2}` : "");
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        per_page: 1,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    const photo = res.data.results[0];
    if (!photo) return {};
    return {
      imageUrl: photo.urls.regular,
      photographerName: photo.user.name,
      photographerUrl: photo.user.links.html,
      unsplashUrl: photo.links.html,
      download_location: photo.links.download_location,
    };
  } catch (err) {
    console.error("Unsplash error:", err.response?.data || err.message);
    return {};
  }
}