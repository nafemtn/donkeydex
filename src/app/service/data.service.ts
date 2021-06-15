// communicate API

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import firebase from 'firebase';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Pokemon } from './pokemon.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
//pattern
  pokemons : any[] =[];
//emettre l'array
  pokemonsSubjects = new Subject<any[]>();

  constructor(
    private http:HttpClient
  ) {}

  emitPokemons() {
    this.pokemonsSubjects.next(this.pokemons);
  }

//save pkemon dans la database

  savePokemons() {
    firebase.database().ref('/pokemons').set(this.pokemons);
  }

//récuperer liste des pokemons de firebase

  getPokemonFromFirebase() {
    firebase.database().ref('/pokemons')
  //Reagir modification database
    .on('value', (data) => {
      this.pokemons = data.val() ? data.val() : []; //si pas de valeur.
      this.emitPokemons();
    });
}

  getSinglePokemon(id: number) {
  return new Promise
  (
    (resolve, reject) =>
    {
      firebase.database().ref('/pokemons/' + id).once('value').then
      (
        (data) =>
        {
          resolve(data.val());
        }, (error) =>
        {
          reject(error);
        }
      );
    }
  );
}

//delete poke caughts ds list

// removePokemon(pokemon: any) {
//   const pokemonIndexToRemove = this.pokemons.findIndex(
//     (pokemonl) => {
//       if(pokemonDel === pokemon) {
//         return true;
//       }
//     }
//   );
//   this.pokemons.splice(pokemonIndexToRemove, 1);
//   this.savePokemons();
//   this.emitPokemons();
// }

//Get Pokemons from API

getPokemon() {
  return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
}

//Get more pokemon Data

getMoreData(name: string) {

return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  }

//appel une api
  getPokemonById(id: any) {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.url, {params} );
  }


  setPokemons(pokemons: any[]){
    this.pokemons = pokemons;
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

  getGeneration() {
    let url ='http://pokeapi.co/api/v2/generation/';
    return this.http.get(url);
  }
}
