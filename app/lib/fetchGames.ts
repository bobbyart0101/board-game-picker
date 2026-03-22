"use client";

export async function fetchGames(params: FormData) {
  const query = new URLSearchParams(params as unknown as Record<string, string>).toString();
  const response = await fetch(`/api/games?${query}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  return response.json();
}
