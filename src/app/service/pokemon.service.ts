import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { GenerationAPI } from '../modeles/generation-api';
import { HttpClient } from '@angular/common/http';

export interface Pokemon {

  id: any;
  name: any;
  type: any;
}
@Injectable({
  providedIn: "root",
})

export class PokemonService {

  constructor(private loggingService: LoggingService,
              private http : HttpClient) { }

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

  getGeneration() {
    let url = 'https://pokeapi.co/api/v2/generation/';
    return this.pokemons;
  }

  comptagePokemons() {
    return this.pokemons.length;
  }

  rechercherPokemon(nomDuPokemon: string) {
    let regex = new RegExp(nomDuPokemon, 'gi');
    return this.pokemons.filter(pokemon =>
      pokemon.name.match(regex));
  }
}
