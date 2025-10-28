
import { GoogleGenAI } from "@google/genai";
import type { Riddle } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateMagicImageHint = async (riddle: Riddle): Promise<string | null> => {
  try {
    const prompt = `Generate a beautiful, magical, and artistic image that serves as a visual hint for a riddle in Disneyland Paris. The image should be mysterious and evocative, not a direct representation of the answer.
    The theme is related to: "${riddle.locationName}".
    The riddle is: "${riddle.question}".
    Create an image that hints at the feeling of this location. For example, for "Pirates of the Caribbean", you could generate an image of an old treasure map with a skull, a ghostly ship in a misty cove, or a talking parrot with a pirate hat.
    Style: digital painting, fantasy art, enchanted, vibrant colors, dreamlike, cinematic lighting, with a strong Disney magic aesthetic.
    Do NOT include any text, letters, or numbers. The image must be purely visual.`;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    console.warn("Image generation returned no images.");
    return null;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Gemini pour la génération d'image:", error);
    return null;
  }
};
