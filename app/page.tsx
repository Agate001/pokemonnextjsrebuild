"use client";

import { useEffect, useState } from "react";
import EvolutionCard from "@/components/EvolutionCard";
import FavoritesCard from "@/components/FavoritesCard";
import MainCard from "@/components/MainCard";
import SearchBar from "@/components/SearchBar";
import { getPokemonData } from "@/lib/pokemonService";
import { getPokemonTheme } from "@/lib/pokemonTheme";

export default function Home() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadPokemon = async (value: string | number) => {
    const data = await getPokemonData(value);
    setPokemon(data);
  };

  useEffect(() => {
    loadPokemon(4);

    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);
const theme = getPokemonTheme("electric");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center"
    style={{
          background: `linear-gradient(135deg, #8f9fab, #c9d6e0, #eef4f8)`,
        }}>
      <SearchBar onSearch={loadPokemon} />

      <main className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <FavoritesCard
          favorites={favorites}
          onSelectPokemon={loadPokemon}
          setFavorites={setFavorites}
        />

        <MainCard
          pokemon={pokemon}
          favorites={favorites}
          setFavorites={setFavorites}
        />

        <EvolutionCard pokemon={pokemon} onSelectPokemon={loadPokemon} />
      </main>
    </div>
  );
}