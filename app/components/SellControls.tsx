"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SellControlsProps {
  title: string;
}

export function SellControls({ title }: SellControlsProps) {
  const [price, setPrice] = useState("");
  const [lang, setLang] = useState("DE");
  const router = useRouter();

  const gameSlug = title.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="flex items-center gap-2 px-4 pb-3">
      <label htmlFor={`price-${gameSlug}`} className="sr-only">Price</label>
      <input
        id={`price-${gameSlug}`}
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-20 text-sm px-2 py-1 rounded-lg bg-surface-container border border-outline-variant text-on-surface placeholder:text-on-surface-variant focus:outline-none"
      />
      <label htmlFor={`lang-${gameSlug}`} className="sr-only">Language</label>
      <input
        id={`lang-${gameSlug}`}
        type="text"
        placeholder="Lang"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="w-16 text-sm px-2 py-1 rounded-lg bg-surface-container border border-outline-variant text-on-surface placeholder:text-on-surface-variant focus:outline-none"
      />
      <button
        onClick={() =>
          router.push(
            `/sell?game=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&lang=${encodeURIComponent(lang)}`
          )
        }
        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-on-primary"
      >
        Sell
      </button>
    </div>
  );
}
