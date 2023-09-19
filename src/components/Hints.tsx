import "../styles/Hints.css";
import { PokemonType } from "../types/PokemonType";

type HintsProps = {
  pokemonToGuess: PokemonType;
};

export const Hints = (props: HintsProps) => {
  const { pokemonToGuess } = props;

  return (
    <span className="hints">
      Types :{" "}
      {pokemonToGuess.types.map(({ name, image }) => (
        <img
          key={name}
          className="type-image"
          src={image}
          alt={`type ${name}`}
        />
      ))}
    </span>
  );
};
