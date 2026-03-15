import axios from 'axios';

/**
 * VisionService for recognizing Solitaire game states from screenshots.
 * Uses LM Studio or OpenAI-compatible Vision API.
 */
export const analyzeScreenshot = async (base64Image) => {
  try {
    // Note: In a real scenario, the user would point this to their local LM Studio 
    // or an OpenAI endpoint. We'll provide a prompt that asks for JSON.
    const response = await axios.post('http://localhost:1234/v1/chat/completions', {
      model: "vision-model", // User's loaded model
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this Klondike Solitaire screenshot. Return ONLY a JSON object representing the state: { tableaus: [[{suit, value, isFaceUp}]...], foundations: {suit: [value]...}, waste: [{suit, value}], stock_count: number }. Use standard suits (hearts, diamonds, clubs, spades) and values (A, 2-10, J, Q, K)."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Vision Analysis Error:", error);
    throw new Error("Failed to analyze screenshot. Ensure LM Studio is running with a vision model.");
  }
};

/**
 * Mock analysis for demonstration if the server is offline.
 */
export const getMockAnalysis = () => ({
  tableaus: [
    [{ suit: 'spades', value: 'K', isFaceUp: true }],
    [{ suit: 'hearts', value: 'Q', isFaceUp: true }],
    [{ suit: 'clubs', value: 'J', isFaceUp: true }],
    [{ suit: 'diamonds', value: '10', isFaceUp: true }],
    [], [], []
  ],
  foundations: { hearts: ['A', '2'], diamonds: [], clubs: [], spades: [] },
  waste: [{ suit: 'hearts', value: 'K', isFaceUp: true }],
  stock_count: 24
});
