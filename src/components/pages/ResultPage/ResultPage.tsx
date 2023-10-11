import "./ResultPage.css";
import GameBar from "@/components/GameBar/GameBar";
import TypeLabel from "@/components/TypeLabel/TypeLabel";
import { PokemonType } from "@/types/PokemonType";

type ResultPageProps = {
  label: string;
  pokemonToGuess: PokemonType;
};

const ResultPage = ({ label, pokemonToGuess }: ResultPageProps) => {
  return (
    <div className="app-screen">
      <div className="app-screen__result">
        <GameBar>{label}</GameBar>

        <div className="app-screen__result__data">
          <div className="app-screen__result__data__top">
            <span className="app-screen__result__data__subtitle">
              N° {pokemonToGuess.id}
            </span>
            <span className="app-screen__result__data__title">
              {pokemonToGuess.displayName}
            </span>
            <span className="app-screen__result__data__subtitle">
              {pokemonToGuess.category}
            </span>
            <span className="app-screen__result__data__types">
              {pokemonToGuess.types.map(({ name, image }) => (
                <TypeLabel key={name} name={name} image={image} />
              ))}
            </span>
          </div>

          <div className="app-screen__result__data__bottom">
            <span className="app-screen__result__data__subtitle">
              Taille : {pokemonToGuess.height}
            </span>
            <span className="app-screen__result__data__subtitle">
              Poids : {pokemonToGuess.weight}
            </span>{" "}
          </div>
        </div>
        <div className="app-screen__result__image">
          <img
            src={pokemonToGuess.sprite}
            alt={`Image de ${pokemonToGuess.displayName}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
