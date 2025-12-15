export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: Array<{ type: { name: string } }>;
  shiny?: boolean;
  cry?: string;
};

const GEN1_MIN = 1;
const GEN1_MAX = 151;

function shinyRoll(): boolean {
  return Math.floor(Math.random() * 512) === 0;
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const base = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json());
  const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(r => r.json());
  const shiny = shinyRoll();
  const image = shiny ? base.sprites.front_shiny : base.sprites.front_default;
  const frName = (species.names as Array<{ language: { name: string }, name: string }>)
    .find(n => n.language?.name === 'fr')?.name ?? base.name;
  const cry = base.cries?.latest ?? base.cries?.legacy;
  return { id: base.id, name: frName, image, types: base.types, shiny, cry };
}

export async function fetchRandomGen1(): Promise<Pokemon> {
  const id = Math.floor(Math.random() * (GEN1_MAX - GEN1_MIN + 1)) + GEN1_MIN;
  return fetchPokemon(id);
}
