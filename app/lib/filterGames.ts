import { COMPLEXITY_RANGES } from "./complexity";

interface GameFilterParams {
  players?: string;
  duration?: string;
  complexity?: string;
}

interface BGGGameDetail {
  minplayers:  { "@_value": string };
  maxplayers:  { "@_value": string };
  minplaytime: { "@_value": string };
  maxplaytime: { "@_value": string };
  statistics: {
    ratings: {
      averageweight: { "@_value": string };
    };
  };
}

export function filterGames(
  games: BGGGameDetail[],
  params: GameFilterParams
): BGGGameDetail[] {
  return games.filter((game) => {
    if (params.players) {
      const players    = parseInt(params.players);
      const minPlayers = parseInt(game.minplayers["@_value"]);
      const maxPlayers = parseInt(game.maxplayers["@_value"]);
      if (players < minPlayers || players > maxPlayers) return false;
    }

    if (params.duration) {
      const duration    = parseInt(params.duration);
      const minPlaytime = parseInt(game.minplaytime["@_value"]);
      const maxPlaytime = parseInt(game.maxplaytime["@_value"]);
      if (duration < minPlaytime || duration > maxPlaytime) return false;
    }

    if (params.complexity) {
      const range = COMPLEXITY_RANGES[params.complexity];
      if (range) {
        const weight = parseFloat(game.statistics.ratings.averageweight["@_value"]);
        const [min, max] = range;
        if (weight < min || weight >= max) return false;
      }
    }

    return true;
  });
}
