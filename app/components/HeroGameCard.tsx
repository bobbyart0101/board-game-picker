import Image from "next/image";

interface HeroGameCardProps {
  title: string;
  players: string;
  complexityFilled: number;
  complexityTotal: number;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function HeroGameCard({
  title,
  players,
  imageSrc,
  imageAlt,
}: HeroGameCardProps) {
  return (
    <section className="relative">
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden editorial-shadow group">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
                {title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded-full">
                  {players}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                Complexity
              </span>
              <p className="text-[10px] text-on-surface-variant font-medium uppercase">
                light
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
