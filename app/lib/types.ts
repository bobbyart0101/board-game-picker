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
