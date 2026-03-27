const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemon(nameOrId: string | number) {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!res.ok) return null;

  return res.json();
}

export async function getSpecies(nameOrId: string | number) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
  const id = Number(nameOrId);
  if (!res.ok ) return null;

  return res.json();
}

export async function getEvolutionChain(url: string) {
  const res = await fetch(url);
  if (!res.ok) return null;

  return res.json();
}

export async function getPokemonData(nameOrId: string | number) {
  const pokemon = await getPokemon(nameOrId);
  if (!pokemon || pokemon.id > 649) return null;

  const species = await getSpecies(pokemon.name);
  if (!species) return null;

  const evolutionData = species.evolution_chain
    ? await getEvolutionChain(species.evolution_chain.url)
    : null;

  const flavorEntry = species.flavor_text_entries.find(
    //they made the languages wierd in the api
    (item: any) => item.language.name === "en",
  );

  const locationRes = await fetch(pokemon.location_area_encounters);
  let location = "N/A";

  if (locationRes.ok) {
    const locationData = await locationRes.json();
    if (locationData.length > 0) {
      location = locationData[0].location_area.name.replaceAll("-", " "); //clean up
    }
  }

  return {
    // variables
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default,
    shiny: pokemon.sprites.other?.["official-artwork"]?.front_shiny,
    types: pokemon.types.map((t: any) => t.type.name), // call me nami the way i be mapping stuff (onpiece joke ifykyk)
    abilities: pokemon.abilities.map((a: any) => a.ability.name),
    moves: pokemon.moves.map((m: any) => m.move.name),
    height: pokemon.height,
    weight: pokemon.weight,
    location,
    flavor: flavorEntry
      ? flavorEntry.flavor_text.replace(/\f/g, " ") //weird arrow thing from the api removed here
      : "N/A",
    evolution: evolutionData ? mapEvolution(evolutionData.chain) : null,
  };
}
function getIdFromUrl(url: string) {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

function getPokemonImage(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`; //chads made the images via pokemon id
}

function mapEvolution(node: any): any {
  // so I get the evo data
  const id = getIdFromUrl(node.species.url);

  return {
    id,
    name: node.species.name,
    image: getPokemonImage(id),
    evolves_to: node.evolves_to.map((e: any) => mapEvolution(e)),
  };
}
