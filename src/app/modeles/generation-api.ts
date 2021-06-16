export class GenerationAPI {
  count: number | undefined;
  results: [
    { name: string; url: string; }
  ] | undefined;
}


// <ul *ngFor="let pokemon of pokemons ">
//   <li> <img [src]="pokemon.sprites.front_default" alt="Pokemon" (click)="clicPokemon(pokemon.name)"> </li>
//   <li> <img [src]="pokemon.sprites.back_default" alt="Pokemon"> </li>
//   <li> <h3> {{ pokemon.name}} </h3> </li>
//   <li> <b>N°:</b> {{ pokemon.id }} </li>
//   <li> <b>Type:</b> {{ pokemon.types[0].type.name }} {{ pokemon.types[1]?.type.name }} </li>
//   <li>  <b>Height:</b> {{ pokemon.height }} </li>
//   <li> <b>Health:</b> {{ pokemon.stats[0].base_stat }} </li>
//   <li> <b>Attack Power:</b> {{ pokemon.stats[1].base_stat }} </li>
//   <li> <b>Weight:</b> {{ pokemon.weight }} </li>
//   <!-- <li> <a (click)="clicPokemon(name)"> Voir le détail de {{pokemon.name}} </a> </li> -->
// </ul>

