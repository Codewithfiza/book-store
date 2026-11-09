"use client";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

export default function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <MagnifyingGlassIcon
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-dim"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-wood bg-surface py-2.5 pl-10 pr-9 font-body text-sm text-text placeholder:text-dim focus:border-primary focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-primary"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
}