import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

export interface Pokemon {

  id: any;
  name: any;
  type: any;
}
@Injectable({
  providedIn: "root",
})

export class PokemonService {

  constructor(private loggingService: LoggingService) { }

  isEditingPokemon = false;
  pokemons: Pokemon[] = [];

  addPokemon(id: number, name: string, type: string) {
    this.loggingService.logItemCreated(name);
    this.pokemons.push({
      id,
      name,
      type,
    });
  }

  private findPokemonIndex(id: any): number {
    return this.pokemons.findIndex((pokemon) => pokemon.id === id);
  }

  removePokemon(pokemon: Pokemon) {
    this.loggingService.logItemRemoved(pokemon.name);
    this.pokemons.splice(this.findPokemonIndex(pokemon.id), 1);
  }

}
