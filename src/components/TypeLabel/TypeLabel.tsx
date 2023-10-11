import POKEMON_TYPE_COLORS from "@/constants/pokemonTypeColors";

import "./TypeLabel.css";

type TypeLabelProps = {
  name: string;
  image: string;
};

const TypeLabel = ({ name, image }: TypeLabelProps) => {
  return (
    <span
      className="type__label"
      style={{ backgroundColor: POKEMON_TYPE_COLORS[name] }}
    >
      <img
        key={name}
        className="type__image"
        src={image}
        alt={`type ${name}`}
      />

      {name}
    </span>
  );
};

export default TypeLabel;
