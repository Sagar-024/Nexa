import { getGeminiRecommendations } from "../services/geminiApi.js";
import { fetchPixabayImages } from "../services/pixabayApi.js";
import dotenv from "dotenv";
dotenv.config();

const getRecommendations = async (req, res) => {
  try {
    const preferences = req.body.preferences;

    // Get places from Gemini
    const geminiObj = await getGeminiRecommendations(preferences);

    // Get images from Pixabay for each place
    const placesWithImages = await Promise.all(
      (geminiObj.top_places || []).map(async (place) => ({
        ...place,
        image: await fetchPixabayImages(
          place.image_search_query || place.name,
          1
        ).then((images) => images[0]), // get the first image from array
      }))
    );

    // Compose response
    const result = {
      ...geminiObj,
      top_places: placesWithImages,
    };

    res.json(result);
  } catch (err) {
    console.error("Error in getRecommendations:", err);

    let errorMessage = err.message || "Unknown error";
    if (err.response && err.response.data) {
      errorMessage += " | Gemini says: " + JSON.stringify(err.response.data);
    }

    res.status(500).json({ error: errorMessage });
  }
};

export default getRecommendations;
