import Image from "next/image";

interface AlternativeMatchCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export function AlternativeMatchCard({
  title,
  imageSrc,
  imageAlt,
}: AlternativeMatchCardProps) {
  return (
    <div className="flex gap-4 p-4 bg-surface-container-low rounded-2xl items-center active:bg-surface-container-high transition-colors">
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="flex-grow space-y-1">
        <h5 className="font-headline font-bold text-on-surface leading-tight">
          {title}
        </h5>
      </div>
    </div>
  );
}
