"use client";

import { getPokemonTheme } from "@/lib/pokemonTheme";

type Props = {
  pokemon: any;
  onSelectPokemon: (value: string | number) => void;
};

export default function EvolutionCard({ pokemon, onSelectPokemon }: Props) {
  const theme = getPokemonTheme(pokemon?.types?.[0]);

  const base = pokemon?.evolution;
  const next = base?.evolves_to?.[0];
  const final = next?.evolves_to?.[0];

  return (
    <div className="w-full xl:w-90">
      <div
        className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
        }}
      >
        <img
          src="assets/pokeball.png"
          alt=""
          className="pointer-events-none absolute -right-10 top-1/2 w-64 -translate-y-1/2 opacity-10"
        />

        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />

        <div className="relative z-10">
          <div className="mb-5">
            <p className="text-sm opacity-80">Evolution Chain</p>
            <h2 className="text-2xl font-bold capitalize">
              {pokemon?.name} Line
            </h2>
          </div>

          <div className="rounded-[22px] bg-white p-4 text-slate-700">
            {!base ? (
              <p>No evolution chain</p>
            ) : (
              <div className="flex flex-col gap-3">
                {/* BASE */}
                <button
                  onClick={() => onSelectPokemon(base.name)}
                  className="flex items-center gap-3 p-3 rounded-2xl"
                  style={{ backgroundColor: theme.soft }}
                >
                  <img src={base.image} className="w-12 h-12" />
                  <p className="capitalize">{base.name}</p>
                </button>

                {/* NEXT */}
                {next && (
                  <>
                    <p className="text-center">↓</p>

                    <button
                      onClick={() => onSelectPokemon(next.name)}
                      className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <img src={next.image} className="w-12 h-12" />
                      <p className="capitalize">{next.name}</p>
                    </button>
                  </>
                )}

                {/* FINAL */}
                {final && (
                  <>
                    <p className="text-center">↓</p>

                    <button
                      onClick={() => onSelectPokemon(final.name)}
                      className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <img src={final.image} className="w-12 h-12" />
                      <p className="capitalize">{final.name}</p>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}