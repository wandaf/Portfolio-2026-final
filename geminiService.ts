import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly for initialization as per guidelines
const getAIClient = () => {
  // Provide a fallback empty string to satisfy TypeScript compiler if env var is undefined during build
  const apiKey = process.env.API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

export const generateCreativeIdea = async (mood: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a minimalist digital design concept idea for a designer's playground. 
               The mood is ${mood}. Provide a short title and a one-sentence description.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["title", "description"],
        propertyOrdering: ["title", "description"]
      }
    }
  });
  
  // Directly access .text property from GenerateContentResponse
  const text = response.text;
  if (!text) {
    return { title: "Creative Spark", description: "Explore the intersection of minimalism and technology." };
  }

  try {
    return JSON.parse(text.trim());
  } catch (e) {
    return { title: "Creative Spark", description: "Explore the intersection of minimalism and technology." };
  }
};

export const askAboutWanda = async (question: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: question,
    config: {
      systemInstruction: "You are Wanda Felsenhardt's digital portfolio assistant. Wanda is a minimalist digital designer based in Chicago. She focuses on UI/UX, product design, and creative technology. Keep your answers brief, professional, and slightly poetic. If asked about her work, refer to her focus on clean aesthetics and user-centric solutions."
    }
  });
  // Use .text property instead of text() method
  return response.text || "";
};