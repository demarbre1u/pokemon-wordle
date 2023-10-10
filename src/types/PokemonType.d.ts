type TypeType = {
  name: string;
  image: string;
};

type TalentType = {
  name: string;
  tc: boolean;
};

export type PokemonType = {
  id: number;
  displayName: string;
  name: string;
  types: TypeType[];
  talents: TalentType[];
  category: string;
  sprite: string;
  height: string;
  weight: string;
};
