import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchExactLyrics, parseLyricsLines } from './lyrics';

export interface GeminiOptions {
  maxTokens?: number;
  tools?: any[];
  responseMimeType?: string;
  responseSchema?: any;
}

export const callGemini = async (prompt: string, apiKey: string, options: GeminiOptions = {}) => {
  if (!apiKey) throw new Error("API Key is missing. Please set it in Settings.");

  const genAI = new GoogleGenerativeAI(apiKey);

  const generationConfig: any = {};
  if (options.maxTokens) generationConfig.maxOutputTokens = options.maxTokens;
  if (options.responseMimeType) generationConfig.responseMimeType = options.responseMimeType;
  if (options.responseSchema) generationConfig.responseSchema = options.responseSchema;

  const modelParams: any = {
    model: "gemini-2.5-flash",
    generationConfig
  };

  if (options.tools) {
    modelParams.tools = options.tools;
  }

  const model = genAI.getGenerativeModel(modelParams);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    throw new Error(error.message || "Gemini API Error");
  }
};

export const generateSongLyrics = async (artist: string, title: string, apiKey: string, locale: string, geniusApiKey?: string, songId?: number) => {
  try {
    console.log(`Fetching exact lyrics for "${title}" by "${artist}" (ID: ${songId})`);
    const lyricsData = await fetchExactLyrics(artist, title, geniusApiKey, songId);
    const originalLines = parseLyricsLines(lyricsData.lyrics);

    console.log(`Found exact lyrics with ${originalLines.length} lines. Using AI for translation only.`);

    const translationPrompt = `
    You are a professional translator. Translate these song lyrics from ${originalLines.length} lines to ${locale}.

    Original lyrics from "${title}" by "${artist}":

    ${originalLines.map((line, idx) => `${idx + 1}. ${line}`).join('\n')}

    IMPORTANT:
    - Translate each line to natural ${locale} that matches song's mood and context
    - Preserve line breaks exactly
    - Return ONLY a JSON array of translations, no other text
    - Each translation must be on the same line number as the original
    `;

    const translationSchema = {
      type: "ARRAY",
      items: {
        type: "STRING"
      }
    };

    const translationText = await callGemini(translationPrompt, apiKey, {
      responseMimeType: "application/json",
      responseSchema: translationSchema
    });

    const translatedLines: string[] = JSON.parse(translationText);

    return {
      lyrics: originalLines.map((original, idx) => ({
        original,
        translated: translatedLines[idx] || ''
      })),
      artist,
      title
    };
  } catch (error) {
    console.warn(`Exact lyrics not found for "${title}" by "${artist}", falling back to AI generation`, error);

    const prompt = `
    You are a language tutor. I am learning a language by listening to music.
    Please generate lyrics for song "${title}" by "${artist}".

    IMPORTANT: Search for official lyrics to ensure accuracy. If you cannot find them, be honest and generate general educational lyrics.

    Output MUST be valid JSON conforming to the schema.
    Provide the full lyrics. The 'translated' field MUST be in ${locale}.
    `;

    const schema = {
      type: "OBJECT",
      properties: {
        lyrics: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              original: { type: "STRING" },
              translated: { type: "STRING" }
            },
            required: ["original", "translated"]
          }
        },
        artist: { type: "STRING" },
        title: { type: "STRING" }
      },
      required: ["lyrics", "artist", "title"]
    };

    try {
      console.log("Attempting to search lyrics with Google Search tool...");
      
      const searchPrompt = `
      Find the official lyrics for the song "${title}" by "${artist}".
      Also find the meaning or translation in ${locale}.
      Return the lyrics and translation in a raw text format.
      `;

      const searchResult = await callGemini(searchPrompt, apiKey, {
        tools: [{ googleSearch: {} }]
      });

      console.log("Search completed. Now formatting to JSON...");

      const formattingPrompt = `
      I have some raw text containing song lyrics and translation.
      Please format this into a structured JSON object.

      Raw Text:
      ${searchResult}

      Task:
      Extract the lyrics and their ${locale} translation.
      If the translation is missing in the raw text, generate it yourself based on the lyrics.

      Output JSON Schema:
      {
        "lyrics": [
          { "original": "line 1", "translated": "translation 1" },
          { "original": "line 2", "translated": "translation 2" }
        ],
        "artist": "${artist}",
        "title": "${title}"
      }
      `;

      const jsonText = await callGemini(formattingPrompt, apiKey, {
        responseMimeType: "application/json",
        responseSchema: schema
      });

      return JSON.parse(jsonText);

    } catch (err) {
      console.warn("Gemini with search failed, falling back to basic generation", err);
      const text = await callGemini(prompt, apiKey, {
        responseMimeType: "application/json",
        responseSchema: schema
      });
      return JSON.parse(text);
    }
  }
};

export const generatePhraseFromLyric = async (lyric: string, artist: string, title: string, apiKey: string, locale: string) => {
  const prompt = `Act like a function that generates a vocabulary list.
  Context: The lyric line "${lyric}" from the song "${title}" by "${artist}".
  Task: Generate 1 vocabulary item or phrase card based on this lyric.
  Output: Corresponding vocabulary or phrases.
  Format: JSON object with meaning, sentence, pronunciation, tags.
  Meaning: ${locale} translation of the phrase/sentence
  Sentence: The original lyric line or key phrase from it
  Pronunciation: Pronunciation guide (e.g. Romaji for Japanese, Pinyin for Chinese, or Phonetic for English)
  Tags: "music" and any other relevant tags (e.g. "expression", "love", etc.)
  `;

  const schema = {
    type: "OBJECT",
    properties: {
      meaning: { type: "STRING" },
      sentence: { type: "STRING" },
      pronunciation: { type: "STRING" },
      tags: { type: "ARRAY", items: { type: "STRING" } }
    },
    required: ["meaning", "sentence"]
  };

  const text = await callGemini(prompt, apiKey, {
    responseMimeType: "application/json",
    responseSchema: schema
  });

  return JSON.parse(text);
};
