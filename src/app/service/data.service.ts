// communicate API

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  pokemons : any [] =[];

  constructor(
    private http:HttpClient
  ) {}

//Get Pokémons

getPokemon() {
  return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
}

//Get more pokemon Data

getMoreData(name: string) {

return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  }

  setPokemons(pokemons: any[]){
    this.pokemons =pokemons;
  }


  getPokemonsSync(){

    return this.pokemons
  }

  getPokemonsByName(name: string) {
    return this.pokemons.filter(pokemon => pokemon.name.includes(name))
  }

  addPokemon(pokemon: any) {
   this.pokemons?.push(pokemon);
  }

  getPokemonsByType(type: string) {
    console.log(type);
    return this.pokemons.filter(pokemon => pokemon.types[0].type.name === type)
  }

}
