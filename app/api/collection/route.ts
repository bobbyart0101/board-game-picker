import { NextResponse } from "next/server";
import { retrieveGameData, retrieveGameDataDetails } from "../../lib/retrieveGameData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bggUsername = searchParams.get("bggUsername") ?? undefined;
    const data = await retrieveGameData({ bggUsername });
    const { items } = data;
    const details = await retrieveGameDataDetails(items);
    return NextResponse.json({ items: { item: details.items.item } });
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve collection" },
      { status: 500 }
    );
  }
}