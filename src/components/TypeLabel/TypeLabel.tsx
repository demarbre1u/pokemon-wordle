import PokemonTypeColors from "@/constants/PokemonTypeColors";

import "./TypeLabel.css";

type TypeLabelProps = {
  name: string;
  image: string;
};

const TypeLabel = ({ name, image }: TypeLabelProps) => {
  const backgroundColor =
    PokemonTypeColors[name as keyof typeof PokemonTypeColors];

  return (
    <span className="type__label" style={{ backgroundColor }}>
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
