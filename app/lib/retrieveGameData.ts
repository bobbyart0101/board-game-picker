import { XMLParser } from "fast-xml-parser";

interface GameQueryParams {
  bggUsername?: string;
  players?: string;
  duration?: string;
  complexity?: string;
}

export async function retrieveGameData(params: GameQueryParams = {}) {
  const apiKey = process.env.API_KEY;

  const { bggUsername } = params;
  const response = await fetch(
    `https://boardgamegeek.com/xmlapi2/collection?username=${bggUsername}&own=1&subtype=boardgame`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const xml = await response.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  return parser.parse(xml);
}

interface BGGItem {
  "@_objectid": string;
}

const BATCH_SIZE = 20;

export async function retrieveGameDataDetails(items: { item: BGGItem[] }) {
  const apiKey = process.env.API_KEY;
  const parser = new XMLParser({ ignoreAttributes: false });

  const ids = items.item.map((i) => i["@_objectid"]);
  const batches: string[][] = [];
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    batches.push(ids.slice(i, i + BATCH_SIZE));
  }

  const results = await Promise.all(
    batches.map(async (batch) => {
      const response = await fetch(
        `https://boardgamegeek.com/xmlapi2/thing?id=${batch.join(",")}&stats=1`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      const xml = await response.text();
      return parser.parse(xml);
    })
  );

  const allItems = results.flatMap((r) => r.items?.item ?? []);
  return { items: { item: allItems } };
}
