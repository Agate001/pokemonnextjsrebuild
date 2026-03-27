"use client";

import { useState } from "react";

type Props = {
  onSearch: (value: string | number) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!value) return;
        onSearch(value);
      }}
      className="mb-2 flex w-full max-w-xl gap-3"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Pokémon by name or ID"
        className="flex-1 rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none"
      />
      <button
        type="submit"
        className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white"
      >
        Search
      </button>
    </form>
  );
}