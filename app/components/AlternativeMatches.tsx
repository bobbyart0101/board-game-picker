import { AlternativeMatchCard } from "./AlternativeMatchCard";
import { AlternativeMatchCardProps } from "../lib/mapGameData";

interface AlternativeMatchesProps {
  games: AlternativeMatchCardProps[];
}

export function AlternativeMatches({ games }: AlternativeMatchesProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between px-1">
        <h4 className="font-headline text-xl font-bold tracking-tight">
          Alternative Matches
        </h4>
      </div>
      <div className="space-y-4">
        {games.map((game) => (
          <AlternativeMatchCard key={game.title} {...game} />
        ))}
      </div>
    </section>
  );
}
