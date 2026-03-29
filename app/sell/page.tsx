import { CopyButton } from "../components/CopyButton";

interface SellPageProps {
  searchParams: Promise<{ game?: string; price?: string; lang?: string }>;
}

export default async function SellPage({ searchParams }: SellPageProps) {
  const { game, price, lang } = await searchParams;
  const name = game ?? "Game name";
  const language = lang ?? "DE";
  const priceValue = price || "[Placeholder]";

  const title = `${name} (${language})`;
  const text = `Ich verkaufe:

${name} (${language})

Preis: ${priceValue} EUR
Zustand: sehr gut

Versand ist möglich, Kosten dafür trägt die kaufende Person. Rabatt bei einer größeren Abnahme kann gern besprochen werden.

Nichtraucherhaushalt!

Es handelt sich hier um einen privaten Verkauf, daher weder eine Rücknahme, noch eine Garantie.`;

  return (
    <main className="px-6 pt-8 max-w-md mx-auto pb-16">
      <h1 className="font-headline text-2xl font-bold mb-6">
        Content for marketplace
      </h1>

      <div className="bg-surface-container-low rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-on-surface">{title}</p>
          <CopyButton text={`${title}\n\n${text}`} />
        </div>
        <pre className="text-sm text-on-surface-variant whitespace-pre-wrap font-sans leading-relaxed">
          {text}
        </pre>
      </div>
    </main>
  );
}
