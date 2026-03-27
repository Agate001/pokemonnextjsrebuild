"use client";

import { useMemo, useState } from "react";
import { getPokemonTheme } from "@/lib/pokemonTheme";

type Props = {
  pokemon: any;
  favorites: any[];
  setFavorites: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function MainCard({
  pokemon,
  favorites,
  setFavorites,
}: Props) {
  const [activeTab, setActiveTab] = useState("about");
  const [showShiny, setShowShiny] = useState(false);

  const theme = useMemo(
    () => getPokemonTheme(pokemon?.types?.[0]),
    [pokemon]
  );

  if (!pokemon) {
    return (
      <div className="w-full max-w-90">
        <div className="rounded-xl bg-slate-200 p-6 text-slate-600 shadow-xl">
          No Pokémon loaded.
        </div>
      </div>
    );
  }

  const isFavorite = favorites.some((item) => item.id === pokemon.id);

  const currentImage = showShiny
    ? pokemon.shiny || pokemon.image
    : pokemon.image || pokemon.shiny;

  const toggleFavorite = () => {
    let updated = [];

    if (isFavorite) {
      updated = favorites.filter((item) => item.id !== pokemon.id);
    } else {
      updated = [
        ...favorites,
        {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
        },
      ];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-90">
      <div
        className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
        }}
      >
        <img
          src="assets/pokeball.png"
          alt=""
          className="pointer-events-none absolute right-12.5 top-6 w-64 select-none opacity-10"
        />

        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />

        <div className="relative z-10">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">
                {pokemon.types.join(" / ")}
              </p>
              <p className="text-xs opacity-70">Pokémon</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFavorite}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-sm transition hover:bg-white/30"
              >
                {isFavorite ? "♥" : "♡"}
              </button>

              <p className="text-sm font-medium opacity-80">
                #{pokemon.id}
              </p>
            </div>
          </div>

          <h2 className="mb-3 text-3xl font-bold tracking-tight capitalize">
            {pokemon.name}
          </h2>

          <div className="mb-4 flex justify-center">
            {currentImage ? (
              <img
                src={currentImage}
                alt={pokemon.name}
                className="h-32 w-32"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 text-sm">
                No image
              </div>
            )}
          </div>

          <div className="mb-4 flex justify-center">
            <div className="inline-flex rounded-full bg-white/20 p-1 backdrop-blur-sm">
              <button
                onClick={() => setShowShiny(false)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm transition ${
                  !showShiny ? "bg-white" : "text-white/85 hover:bg-white/10"
                }`}
                style={{ color: !showShiny ? theme.accent : undefined }}
              >
                Regular
              </button>
              <button
                onClick={() => setShowShiny(true)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  showShiny ? "bg-white" : "text-white/85 hover:bg-white/10"
                }`}
                style={{ color: showShiny ? theme.accent : undefined }}
              >
                Shiny
              </button>
            </div>
          </div>

          <div className="rounded-[22px] bg-white px-3 py-3 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
            <div className="mb-4 flex rounded-full bg-slate-100 p-1">
              <button
                onClick={() => setActiveTab("about")}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
                  activeTab === "about"
                    ? "bg-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                style={{ color: activeTab === "about" ? theme.accent : undefined }}
              >
                About
              </button>

              <button
                onClick={() => setActiveTab("moves")}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
                  activeTab === "moves"
                    ? "bg-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                style={{ color: activeTab === "moves" ? theme.accent : undefined }}
              >
                Moves
              </button>

              <button
                onClick={() => setActiveTab("abilities")}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
                  activeTab === "abilities"
                    ? "bg-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                style={{
                  color: activeTab === "abilities" ? theme.accent : undefined,
                }}
              >
                Abilities
              </button>
            </div>

            <div className="min-h-37.5">
              {activeTab === "about" && (
                <div className="space-y-3">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Location
                    </p>
                    <p className="text-sm font-medium">{pokemon.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Height
                      </p>
                      <p className="text-sm font-medium">{pokemon.height}</p>
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Weight
                      </p>
                      <p className="text-sm font-medium">{pokemon.weight}</p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Description
                    </p>
                    <p className="text-sm leading-6 text-slate-600">
                      {pokemon.flavor}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "moves" && (
                <div className="max-h-42.5 overflow-y-auto pr-1">
                  <div className="flex flex-wrap gap-2">
                    {pokemon.moves.map((move: string) => (
                      <span
                        key={move}
                        className="rounded-full px-3 py-1 text-xs font-medium capitalize"
                        style={{
                          backgroundColor: theme.badgeBg,
                          color: theme.badgeText,
                        }}
                      >
                        {move.replaceAll("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "abilities" && (
                <div className="space-y-3">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Available Abilities
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {pokemon.abilities.map((ability: string) => (
                        <span
                          key={ability}
                          className="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                          style={{
                            backgroundColor: theme.badgeBg,
                            color: theme.badgeText,
                          }}
                        >
                          {ability.replaceAll("-", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}