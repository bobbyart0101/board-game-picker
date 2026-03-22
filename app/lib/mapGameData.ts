import type { HeroGameCardProps, AlternativeMatchCardProps } from "./types";

export type { HeroGameCardProps, AlternativeMatchCardProps };

interface BGGName {
  "@_type": string;
  "@_value": string;
}

interface BGGGame {
  name: BGGName | BGGName[];
  minplayers: { "@_value": string };
  maxplayers: { "@_value": string };
  image: string;
  statistics: {
    ratings: {
      averageweight: { "@_value": string };
    };
  };
}

export function mapAlternativeGame(game: BGGGame): AlternativeMatchCardProps {
  const names = Array.isArray(game.name) ? game.name : [game.name];
  const primaryName = names.find((n) => n["@_type"] === "primary");
  const title = primaryName?.["@_value"] ?? "Unknown";

  return {
    title,
    imageSrc: game.image,
    imageAlt: `Box of ${title}`,
  };
}

export function mapPrimaryGame(game: BGGGame): HeroGameCardProps {
  const names = Array.isArray(game.name) ? game.name : [game.name];
  const primaryName = names.find((n) => n["@_type"] === "primary");
  const title = primaryName?.["@_value"] ?? "Unknown";

  const min = game.minplayers["@_value"];
  const max = game.maxplayers["@_value"];
  const players = min === max ? `${min} Players` : `${min}-${max} Players`;

  return {
    title,
    players,
    imageSrc: game.image,
    imageAlt: `Box of ${title}`,
    statistics: game.statistics,
  };
}
