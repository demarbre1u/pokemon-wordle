import "../styles/Hints.css";
import { PokemonType } from "../types/PokemonType";

type HintsProps = {
  pokemonToGuess: PokemonType;
  currentTry: number;
};

const TYPE_HINT_THRESHOLD = 1;

export const Hints = (props: HintsProps) => {
  const { pokemonToGuess, currentTry } = props;

  return (
    <div className="hints">
      <span className="type-hint">
        {currentTry >= TYPE_HINT_THRESHOLD ? (
          <>
            Types :{" "}
            {pokemonToGuess.types.map(({ name, image }) => (
              <img
                key={name}
                className="type-image"
                src={image}
                alt={`type ${name}`}
              />
            ))}
          </>
        ) : (
          <>Indice dans {TYPE_HINT_THRESHOLD - currentTry} essaie(s)</>
        )}
      </span>
    </div>
  );
};
