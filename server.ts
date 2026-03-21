import http from 'http';
import { GoogleGenAI, Type } from '@google/genai';
import { config } from 'dotenv';

config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const citySchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    title: { type: Type.STRING },
    population: { type: Type.NUMBER },
    government: { type: Type.STRING },
    economy: { type: Type.STRING },
    magicLevel: { type: Type.NUMBER },
    history: { type: Type.STRING },
    latitude: { type: Type.STRING },
    longitude: { type: Type.STRING },
    strategicVitals: {
      type: Type.OBJECT,
      properties: {
        securityRating: { type: Type.STRING },
        tradeVolume: { type: Type.NUMBER },
        stabilityStatus: { type: Type.STRING, enum: ["STABLE", "FRAGILE", "VOLATILE"] }
      },
      required: ["securityRating", "tradeVolume", "stabilityStatus"]
    },
    territorialFootprint: {
      type: Type.OBJECT,
      properties: {
        chokepoints: {
          type: Type.ARRAY,
          items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, status: { type: Type.STRING, enum: ["SECURE", "CRITICAL", "CONTESTED"] }, description: { type: Type.STRING } } }
        },
        bufferZones: {
          type: Type.ARRAY,
          items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, status: { type: Type.STRING, enum: ["FRIENDLY", "NEUTRAL", "HOSTILE"] }, description: { type: Type.STRING } } }
        }
      },
      required: ["chokepoints", "bufferZones"]
    },
    resourceMatrix: {
      type: Type.ARRAY,
      items: { type: Type.OBJECT, properties: { resource: { type: Type.STRING }, status: { type: Type.STRING, enum: ["SURPLUS", "DEFICIT", "STABLE"] }, dependency: { type: Type.STRING } } }
    },
    mythicIntel: {
      type: Type.OBJECT,
      properties: {
        leyLineProximity: { type: Type.STRING, enum: ["DISTANT", "INTERACTING", "INTERSECTING"] },
        strategicMagicAssets: { type: Type.ARRAY, items: { type: Type.STRING } },
        arcaneSignature: { type: Type.STRING }
      },
      required: ["leyLineProximity", "strategicMagicAssets", "arcaneSignature"]
    },
    districts: {
      type: Type.ARRAY,
      items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, vibe: { type: Type.STRING }, dangerLevel: { type: Type.NUMBER } }, required: ["name", "description", "vibe", "dangerLevel"] }
    },
    npcs: {
      type: Type.ARRAY,
      items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, role: { type: Type.STRING }, description: { type: Type.STRING }, secret: { type: Type.STRING } }, required: ["name", "role", "description", "secret"] }
    },
    rumors: {
      type: Type.ARRAY,
      items: { type: Type.OBJECT, properties: { source: { type: Type.STRING }, text: { type: Type.STRING }, truthValue: { type: Type.STRING } }, required: ["source", "text", "truthValue"] }
    },
    leylineNodes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING }, type: { type: Type.STRING }, frequency: { type: Type.STRING }, stability: { type: Type.NUMBER }, effect: { type: Type.STRING },
          coordinates: { type: Type.OBJECT, properties: { x: { type: Type.NUMBER }, y: { type: Type.NUMBER } }, required: ["x", "y"] }
        },
        required: ["name", "type", "frequency", "stability", "effect", "coordinates"]
      }
    },
    theology: {
      type: Type.OBJECT,
      properties: {
        pantheon: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, domain: { type: Type.STRING }, influence: { type: Type.NUMBER }, heresyLevel: { type: Type.NUMBER } }, required: ["name", "domain", "influence", "heresyLevel"] } },
        faithTension: { type: Type.NUMBER },
        miracleFrequency: { type: Type.STRING }
      },
      required: ["pantheon", "faithTension", "miracleFrequency"]
    },
    mercantile: {
      type: Type.OBJECT,
      properties: {
        commodities: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, price: { type: Type.STRING }, trend: { type: Type.STRING }, volatility: { type: Type.NUMBER } }, required: ["name", "price", "trend", "volatility"] } },
        wealthGap: { type: Type.NUMBER },
        primaryExport: { type: Type.STRING }
      },
      required: ["commodities", "wealthGap", "primaryExport"]
    },
    society: {
      type: Type.OBJECT,
      properties: {
        matrix: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { species: { type: Type.STRING }, percentage: { type: Type.NUMBER } }, required: ["species", "percentage"] } },
        unrestIndex: { type: Type.NUMBER },
        casteHierarchy: { type: Type.STRING }
      },
      required: ["matrix", "unrestIndex", "casteHierarchy"]
    },
    infrastructure: {
      type: Type.OBJECT,
      properties: {
        siegeDays: { type: Type.NUMBER },
        wallIntegrity: { type: Type.NUMBER },
        garrisonReadiness: { type: Type.NUMBER },
        defenseNodes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, integrity: { type: Type.NUMBER }, type: { type: Type.STRING } }, required: ["name", "integrity", "type"] } }
      },
      required: ["siegeDays", "wallIntegrity", "garrisonReadiness", "defenseNodes"]
    }
  },
  required: ["name", "title", "population", "government", "economy", "magicLevel", "history", "latitude", "longitude", "strategicVitals", "territorialFootprint", "resourceMatrix", "mythicIntel", "districts", "npcs", "rumors", "leylineNodes", "theology", "mercantile", "society", "infrastructure"]
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/generate') {
    let body = '';
    for await (const chunk of req) body += chunk;

    const { prompt } = JSON.parse(body);
    if (!prompt) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing prompt' }));
      return;
    }

    console.log(`Generating city for: "${prompt}"`);

    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Persona: You are the Senior Archivist of the Universal City Codex.
          Your purpose is to provide scholarly, high-fidelity, and neutral accounts of various fantasy settlements.
          Avoid militaristic jargon; instead, use formal, scholarly language. Every data point should illustrate the city's unique nature and systemic challenges.

          Provide a detailed archive entry for: ${prompt}.
          Include: Domain Statistics, Arcane Resonance (5 nodes), Theological Record (3 deities), Commerce Ledger (4 items), Societal Structure, and Defense Architecture.

          CRITICAL numeric ranges — all values MUST be within these ranges and non-zero:
          - magicLevel: 1-10
          - tradeVolume: 10-100
          - leylineNodes[].stability: 10-100 (percentage)
          - leylineNodes[].coordinates: x 10-90, y 10-90 (percentage positions)
          - theology.faithTension: 10-100
          - theology.pantheon[].influence: 10-100
          - theology.pantheon[].heresyLevel: 1-10
          - mercantile.commodities[].volatility: 1-20 (out of 20)
          - mercantile.wealthGap: 10-100
          - society.unrestIndex: 10-100
          - society.matrix[].percentage: 5-60 (must sum to ~100)
          - infrastructure.wallIntegrity: 10-100
          - infrastructure.garrisonReadiness: 10-100
          - infrastructure.siegeDays: 10-500
          - infrastructure.defenseNodes[].integrity: 10-100

          Output JSON only.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: citySchema,
          },
        });

        const text = response.text;
        if (!text) throw new Error("Generated content is empty.");

        const cityData = JSON.parse(text);
        console.log(`Generated: ${cityData.name}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cityData));
        return;
      } catch (error: any) {
        lastError = error;
        const status = error?.status || error?.error?.code;
        const isRetryable = status === 429 || (status >= 500 && status < 600);

        if (isRetryable && attempt < maxRetries) {
          const baseDelay = status === 429 ? 4000 : 2000;
          const delay = Math.pow(2, attempt) * baseDelay + Math.random() * 1000;
          console.log(`Retry ${attempt + 1} in ${Math.round(delay)}ms...`);
          await sleep(delay);
          continue;
        }
        break;
      }
    }

    console.error('Generation failed:', lastError?.message || lastError);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to generate city data' }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
