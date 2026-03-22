import { NextResponse } from "next/server";
import { retrieveGameData, retrieveGameDataDetails } from "../../lib/retrieveGameData";
import { filterGames } from "../../lib/filterGames";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      bggUsername: searchParams.get("bggUsername") ?? undefined,
      players:    searchParams.get("players")    ?? undefined,
      duration:   searchParams.get("duration")   ?? undefined,
      complexity:   searchParams.get("complexity")   ?? undefined,
      mechanicType: searchParams.get("mechanicType") ?? undefined,
    };
    const data = await retrieveGameData(params);
    const { items } = data;
    const details = await retrieveGameDataDetails(items);
    const filtered = filterGames(details.items.item, params);
    return NextResponse.json({ items: { item: filtered } });
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve game data" },
      { status: 500 }
    );
  }
}
