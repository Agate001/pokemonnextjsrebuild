"use client";

import { getPokemonTheme } from "@/lib/pokemonTheme";

type Props = {
  favorites: any[];
  onSelectPokemon: (value: string | number) => void;
  setFavorites: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function FavoritesCard({
  favorites,
  onSelectPokemon,
  setFavorites,
}: Props) {
  const theme = getPokemonTheme("electric");

   const removeFavorite = (id: number) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="w-full xl:w-90">
      <div
        className="relative overflow-hidden rounded-lg p-5 text-white shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
        }}
      >
        <img
          src="assets/pokeball.png"
          alt=""
          className="pointer-events-none absolute right-10 top-1/2 w-64 -translate-y-1/2 select-none opacity-10"
        />

        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />

        <div className="relative z-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">Favorites</p>
              <h2 className="text-2xl font-bold">Saved Pokémon</h2>
            </div>

            <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {favorites.length} Saved
            </div>
          </div>

          <div className="rounded-[22px] bg-white p-4 text-slate-700">
            <div className="flex max-h-105 flex-col gap-3 overflow-y-auto pr-1">
              {favorites.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  No favorites yet.
                </div>
              ) : (
                favorites.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-2xl p-3"
                    style={{ backgroundColor: theme.soft }}
                  >
                    <button
                      onClick={() => onSelectPokemon(item.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold capitalize">
                          {item.name.replaceAll("-", " ")}
                        </p>
                        <p className="text-xs text-slate-400">
                          #{item.id}
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="ml-1 rounded-full px-2 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}