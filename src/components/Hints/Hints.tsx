import "./Hints.css";
import { PokemonType } from "../../types/PokemonType";
import TypeLabel from "@/components/TypeLabel/TypeLabel";
import GameBar from "../GameBar/GameBar";

type HintsProps = {
  pokemonToGuess: PokemonType;
  currentTry: number;
};

const FIRST_HINT_THRESHOLD = 1;
const SECOND_HINT_THRESHOLD = 2;

export const Hints = (props: HintsProps) => {
  const { pokemonToGuess, currentTry } = props;

  return (
    <GameBar>
      <span className="type-hint">
        {currentTry >= FIRST_HINT_THRESHOLD ? (
          <>
            Types :{" "}
            {pokemonToGuess.types.map(({ name, image }) => (
              <TypeLabel key={name} name={name} image={image} />
            ))}
          </>
        ) : (
          <>Indice dans {FIRST_HINT_THRESHOLD - currentTry} essai</>
        )}
      </span>

      <span className="separator">|</span>

      <span className="talents-hint">
        {currentTry >= SECOND_HINT_THRESHOLD ? (
          <>
            Talents :{" "}
            {pokemonToGuess.talents.map(({ name, tc }, index) => {
              const nameEl = tc ? (
                <abbr title="Talent caché">{name}</abbr>
              ) : (
                name
              );

              return (
                <span key={index}>
                  {index ? <> / {nameEl}</> : <>{nameEl}</>}
                </span>
              );
            })}
          </>
        ) : (
          <>Indice dans {SECOND_HINT_THRESHOLD - currentTry} essais</>
        )}
      </span>
    </GameBar>
  );
};
