import { getGeminiRecommendations } from "../services/geminiApi.js";
import { fetchPixabayImage } from "../services/fetchPixabayImage.js";
import dotenv from 'dotenv'
dotenv.config()

const getRecommendations = async (req, res) => {
  try {
    const preferences = req.body.preferences;

    // 1. Get result from Gemini (structured object)
    
    const geminiObj = await getGeminiRecommendations(preferences);

    // 2. Get Unsplash image for each top place
    const placesWithImages = await Promise.all(
      (geminiObj.top_places || []).map(async (place) => ({
        ...place,
        image: await fetchUnsplashImage(
          place.image_search_query || place.name,
          place.category
        )
      }))
    );

    // 3. Compose response
    const result = {
      ...geminiObj,
      top_places: placesWithImages
    };

    res.json(result);

  } catch (err) {
    console.error("Error in getRecommendations:", err);

    let errorMessage = err.message || "Unknown error";
    if (err.response && err.response.data) {
      errorMessage += ' | Gemini says: ' + JSON.stringify(err.response.data);
    }

    res.status(500).json({ error: errorMessage });
  }
};

export default getRecommendations;
