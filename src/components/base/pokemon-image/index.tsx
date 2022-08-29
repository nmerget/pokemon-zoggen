import { PokemonImageType } from './data';

function PokemonImage({ size, speciesId, invisible, alt }: PokemonImageType) {
  return (
    <img
      className={`h-${size} w-${size}`}
      loading="lazy"
      width={size}
      height={size}
      src={
        invisible || !speciesId
          ? '/images/0.png'
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`
      }
      alt={alt}
    />
  );
}

export default PokemonImage;
