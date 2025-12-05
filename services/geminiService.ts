import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// Ensure process.env.API_KEY is available in your environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIFeedback = async (userCode: string, question: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Demo Mode: Please configure your API_KEY to receive real AI feedback. In a real scenario, I would explain your pointer logic error here.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are CodeCraft's AI Tutor, a friendly expert in C and C++. 
    Provide concise, gamified feedback on code snippets. Use terms like "Memory Leak Detected" or "Optimization Achievement". 
    Keep explanations simple for beginners but accurate.`;

    const prompt = `
      User Code:
      \`\`\`cpp
      ${userCode}
      \`\`\`
      
      User Question: ${question}
      
      Provide a helpful response.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "No feedback generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI Tutor. Please try again later.";
  }
};