import "./Hints.css";
import { PokemonType } from "../../types/PokemonType";
import TypeLabel from "@/components/TypeLabel/TypeLabel";
import GameBar from "@/components/GameBar/GameBar";

const FIRST_HINT_THRESHOLD = 1;
const SECOND_HINT_THRESHOLD = 2;

type HintsProps = {
  pokemonToGuess: PokemonType;
  currentTry: number;
};

export const Hints = (props: HintsProps) => {
  const { pokemonToGuess, currentTry } = props;

  return (
    <GameBar>
      <span className="hint__types">
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

      <span className="hint__talents">
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
