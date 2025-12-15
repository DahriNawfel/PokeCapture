export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
  shiny?: boolean;
  cry?: string;
  catchRate: number;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  abilities: string[];
  height: number;
  weight: number;
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
  const catchRate = species.capture_rate ?? 45;
  
  const abilityPromises = base.abilities.map(async (a: { ability: { url: string } }) => {
    const abilityData = await fetch(a.ability.url).then(r => r.json());
    const frAbilityName = (abilityData.names as Array<{ language: { name: string }, name: string }>)
      .find((n: { language: { name: string }, name: string }) => n.language?.name === 'fr')?.name;
    return frAbilityName || abilityData.name;
  });
  const abilities = await Promise.all(abilityPromises);
  
  const typePromises = base.types.map(async (t: { type: { url: string } }) => {
    const typeData = await fetch(t.type.url).then(r => r.json());
    const frTypeName = (typeData.names as Array<{ language: { name: string }, name: string }>)
      .find((n: { language: { name: string }, name: string }) => n.language?.name === 'fr')?.name;
    return frTypeName || typeData.name;
  });
  const types = await Promise.all(typePromises);
  
  return { 
    id: base.id, 
    name: frName, 
    image, 
    types, 
    shiny, 
    cry, 
    catchRate,
    stats: base.stats,
    abilities,
    height: base.height,
    weight: base.weight
  };
}

export async function fetchRandomGen1(): Promise<Pokemon> {
  const id = Math.floor(Math.random() * (GEN1_MAX - GEN1_MIN + 1)) + GEN1_MIN;
  return fetchPokemon(id);
}
