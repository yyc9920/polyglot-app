
export const callGemini = async (prompt: string, apiKey: string, maxTokens?: number, tools?: any[]) => {
  if (!apiKey) throw new Error("API Key is missing. Please set it in Settings.");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const body: any = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  if (maxTokens) {
    body.generationConfig = {
      maxOutputTokens: maxTokens
    };
  }

  if (tools) {
    body.tools = tools;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Gemini API Error");
  }

  const result = await response.json();
  return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

export const generateSongMaterials = async (artist: string, title: string, apiKey: string) => {
  const prompt = `
  You are a language tutor. I am learning a language by listening to music.
  Please generate learning materials for the song "${title}" by "${artist}".
  
  IMPORTANT: Please Search for the official lyrics of this song to ensure accuracy.
  
  Output MUST be valid JSON with this exact schema:
  {
    "lyrics": [
       { "original": "line 1", "translated": "translation 1" },
       { "original": "line 2", "translated": "translation 2" }
    ],
    "phrases": [
       { 
         "meaning": "Meaning of the phrase", 
         "sentence": "The phrase in its original language", 
         "pronunciation": "How to pronounce the phrase"
       }
    ],
    "artist": "${artist}",
    "title": "${title}"
  }
  
  Provide around 10 phrases (key vocabulary or useful expressions) from the lyrics.
  The 'sentence' should be the phrase itself, and 'meaning' its translation.
  Do not include markdown formatting (like \`\`\`json). Return raw JSON.
  `;
  
  const parseResponse = (text: string) => {
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      try {
          // Temp fix for schema change if AI doesn't comply
          const parsed = JSON.parse(cleanText);
          if (parsed.vocabulary && !parsed.phrases) {
              parsed.phrases = parsed.vocabulary.map((v: any) => ({
                  sentence: v.sentence || v.word,
                  meaning: v.meaning,
                  pronunciation: v.pronunciation
              }));
              delete parsed.vocabulary;
          }
          return parsed;
      } catch (e) {
          console.error("Failed to parse Gemini JSON:", cleanText);
          throw new Error("AI response was not valid JSON. Please try again.");
      }
  };

  try {
      // Try with Google Search grounding for accuracy
      const text = await callGemini(prompt, apiKey, undefined, [{ google_search: {} }]);
      return parseResponse(text);
  } catch (err) {
      console.warn("Gemini with search failed or not supported, falling back to basic generation.", err);
      // Fallback to basic generation without tools
      const text = await callGemini(prompt, apiKey);
      return parseResponse(text);
  }
};
