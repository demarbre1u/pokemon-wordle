import "./TypeLabel.css";
import POKEMON_TYPE_COLORS from "@/constants/pokemonTypeColors";

type TypeLabelProps = {
  name: string;
  image: string;
};

const TypeLabel = ({ name, image }: TypeLabelProps) => {
  return (
    <span
      className="type-label"
      style={{ backgroundColor: POKEMON_TYPE_COLORS[name] }}
    >
      <img key={name} className="type-image" src={image} alt={`type ${name}`} />

      {name}
    </span>
  );
};

export default TypeLabel;
