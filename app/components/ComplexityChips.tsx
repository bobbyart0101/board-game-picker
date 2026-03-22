"use client";

import { useState } from "react";

const COMPLEXITY_OPTIONS = [
  "Light",
  "Medium Light",
  "Medium",
  "Medium Heavy",
  "Heavy",
] as const;

type Complexity = (typeof COMPLEXITY_OPTIONS)[number];

interface ComplexityChipsProps {
  defaultSelected?: Complexity | null;
  onChange?: (value: Complexity | null) => void;
}

export function ComplexityChips({
  defaultSelected = null,
  onChange,
}: ComplexityChipsProps) {
  const [selected, setSelected] = useState<Complexity | null>(defaultSelected);

  function handleClick(option: Complexity) {
    const next = option === selected ? null : option;
    setSelected(next);
    onChange?.(next);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {COMPLEXITY_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleClick(option)}
          className={
            option === selected
              ? "px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container text-sm font-bold shadow-sm"
              : "px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface text-sm font-medium hover:bg-secondary-container transition-colors"
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
