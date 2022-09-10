import { PokemonImageType } from './data';

function PokemonImage({
  size,
  speciesId,
  invisible,
  alt,
  icon,
}: PokemonImageType) {
  return (
    <img
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      className="object-contain"
      loading="lazy"
      width={size}
      height={size}
      src={
        invisible || !speciesId
          ? '/images/0.png'
          : icon
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${speciesId}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`
      }
      alt={alt}
    />
  );
}

export default PokemonImage;
