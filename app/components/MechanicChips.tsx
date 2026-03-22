"use client";

import { useState } from "react";
import { MechanicType } from "../lib/types";

const MECHANIC_OPTIONS = Object.values(MechanicType);

interface MechanicChipsProps {
  defaultSelected?: MechanicType | null;
  onChange?: (value: MechanicType | null) => void;
}

export function MechanicChips({
  defaultSelected = null,
  onChange,
}: MechanicChipsProps) {
  const [selected, setSelected] = useState<MechanicType | null>(defaultSelected);

  function handleClick(option: MechanicType) {
    const next = option === selected ? null : option;
    setSelected(next);
    onChange?.(next);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {MECHANIC_OPTIONS.map((option) => (
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
