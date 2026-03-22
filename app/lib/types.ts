export enum MechanicType {
  CooperativeGame = "Cooperative Game",
  DeckBagAndPoolBuilding = "Deck, Bag, and Pool Building",
  DiceRolling = "Dice Rolling",
  OpenDrafting = "Open Drafting",
  PaperAndPencil = "Paper-and-Pencil",
  Rondel = "Rondel",
  ScenarioCampaignGame = "Scenario / Mission / Campaign Game",
  SoloSolitaireGame = "Solo / Solitaire Game",
  WorkerPlacement = "Worker Placement",
  SetCollection = "Set Collection",
}

export interface HeroGameCardProps {
  title: string;
  players: string;
  imageSrc: string;
  imageAlt: string;
  statistics: {
    ratings: {
      averageweight: { "@_value": string };
    };
  };
}

export interface AlternativeMatchCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
}
