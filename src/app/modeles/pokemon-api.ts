export class PokemonAPI {

  name: string | undefined;
  sprites!: {
    front_default: string;
    back_default: string;
  }
  id!: number;
  type!: string;
  Height!: string;
  Health!: string;
  Attack!: string;
  Weight!: string;
}
