import { GoogleGenAI } from "@google/genai";
import { UIStyle } from '../types';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateUIConcept = async (style: UIStyle): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found in environment variables.");
  }

  const prompt = `
    Generate a high-fidelity, photorealistic UI design mockup for a mobile app or web landing page.
    
    Style Category: ${style.category}
    
    Strictly adhere to these design principles:
    - Keywords/Vibe: ${style.keywords}
    - Color Palette: ${style.colors}
    - Key Visual Effects: ${style.effects}
    
    The image should be a high-quality presentation shot, suitable for Dribbble or Behance. 
    Make sure the text is abstract or legible as a header, but focus on the visual layout and aesthetic.
    Ensure the specific characteristics of ${style.category} are clearly visible (e.g., if Glassmorphism, show blur; if Neumorphism, show soft shadows).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      }
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data received from Gemini.");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};