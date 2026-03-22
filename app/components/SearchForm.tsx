"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ComplexityChips } from "./ComplexityChips";
import { fetchGames } from "../lib/fetchGames";
import { randomPick } from "../lib/randomPick";
import { useGameStore } from "../lib/gameStore";

export function SearchForm() {
  const router = useRouter();
  const setPick = useGameStore((s) => s.setPick);
  const [bggUsername, setBggUsername] = useState(() => localStorage.getItem("bggUsername") ?? "");
  const [players, setPlayers] = useState("");
  const [duration, setDuration] = useState("");
  const [complexity, setComplexity] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  async function submitProposal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotification(null);
    const formData = new FormData(e.currentTarget);
    formData.set("complexity", complexity ?? "");
    console.log(Object.fromEntries(formData));
    let data;
    try {
      data = await fetchGames(formData);
    } catch (err) {
      setNotification(err instanceof Error ? err.message : "Failed to fetch games");
      return;
    }
    const pick = randomPick(data.items.item);
    if (!pick) {
      setNotification("No Game Matched");
      return;
    }
    setPick(pick.primary, pick.alternatives);
    localStorage.setItem("bggUsername", bggUsername);
    router.push("/result");
  }

  return (
    <form className="space-y-10" onSubmit={submitProposal}>
      {/* BGG Username */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">
            person
          </span>
          <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            Username in BGG
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="bggUsername"
            placeholder="e.g. tabletop_pro"
            value={bggUsername}
            onChange={(e) => setBggUsername(e.target.value)}
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 font-medium text-on-surface placeholder:text-outline-variant"
          />
        </div>
      </section>

      {/* Number of Players */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">
            groups
          </span>
          <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            Gathering Size
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            name="players"
            min={1}
            max={20}
            placeholder="Number of players"
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 font-medium text-on-surface placeholder:text-outline-variant"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium text-sm">
            Players
          </div>
        </div>
      </section>

      {/* Game Duration */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">
            schedule
          </span>
          <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            Time Commitment
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            name="duration"
            step={15}
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 font-medium text-on-surface placeholder:text-outline-variant"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium text-sm">
            Minutes
          </div>
        </div>
      </section>

      {/* Complexity */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">
            psychology
          </span>
          <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            Rule Complexity
          </label>
        </div>
        <ComplexityChips onChange={setComplexity} />
      </section>

      {/* Notification */}
      {notification && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-error-container text-on-error-container text-sm font-medium">
          <span className="material-symbols-outlined text-sm">info</span>
          {notification}
        </div>
      )}

      {/* CTA */}
      <div className="pt-6 pb-12">
        <button
          type="submit"
          className="w-full py-5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg shadow-xl shadow-primary/20 active:translate-y-0.5 transition-transform flex items-center justify-center gap-3"
        >
          Propose a Game
          <span className="material-symbols-outlined">auto_awesome</span>
        </button>
        <p className="text-center text-on-surface-variant text-[11px] mt-4 font-medium uppercase tracking-[0.2em]">
          Made by Chia-En
        </p>
      </div>
    </form>
  );
}
