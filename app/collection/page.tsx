import { retrieveGameData, retrieveGameDataDetails } from "../lib/retrieveGameData";
import { mapAlternativeGame } from "../lib/mapGameData";
import { AlternativeMatchCard } from "../components/AlternativeMatchCard";
import { SellControls } from "../components/SellControls";

interface CollectionPageProps {
  searchParams: Promise<{ bggUsername?: string }>;
}

export default async function CollectionPage({ searchParams }: CollectionPageProps) {
  const { bggUsername } = await searchParams;

  if (!bggUsername) {
    return (
      <main className="px-6 pt-8 max-w-md mx-auto">
        <h1 className="font-headline text-2xl font-bold">Collection</h1>
        <p className="text-on-surface-variant mt-2">
          Pass <code>?bggUsername=</code> to load a collection.
        </p>
      </main>
    );
  }

  const raw = await retrieveGameData({ bggUsername });
  const details = await retrieveGameDataDetails(raw.items);
  const games = details.items.item.map(mapAlternativeGame);

  return (
    <main className="px-6 pt-8 max-w-md mx-auto pb-16">
      <h1 className="font-headline text-2xl font-bold mb-1">{bggUsername}&apos;s Collection</h1>
      <p className="text-on-surface-variant text-sm mb-6">{games.length} games</p>
      <div className="space-y-4">
        {games.map((game) => (
          <div key={game.title} className="bg-surface-container-low rounded-2xl overflow-hidden">
            <AlternativeMatchCard {...game} />
            <SellControls title={game.title} />
          </div>
        ))}
      </div>
    </main>
  );
}
