type TypeType = {
  name: string;
  image: string;
};

type TalentType = {
  name: string;
  tc: boolean;
};

export type PokemonType = {
  name: string;
  types: TypeType[];
  talents: TalentType[];
  category: string;
};
