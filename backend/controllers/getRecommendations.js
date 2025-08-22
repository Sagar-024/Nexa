import { getGeminiRecommendations } from "../services/geminiApi.js";
import { fetchUnsplashImage } from "../services/unsplashApi.js";

export const getRecommendations = async (req, res) => {
  try {
    const preferences = req.body.preferences;

    // 1. Get full result from Gemini (structured object)
    const geminiObj = await getGeminiRecommendations(preferences); // expects { meta, top_places, ... }

    // 2. For each top place, get Unsplash image and merge in
    const placesWithImages = await Promise.all(
      (geminiObj.top_places || []).map(async (place) => ({
        ...place,
        image: await fetchUnsplashImage(place.image_search_query || place.name, place.category)
      }))
    );

    // 3. Compose final response (all metadata + image-complete places)
    const result = {
      ...geminiObj,
      top_places: placesWithImages, // replace with image-enriched places
    };

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};
