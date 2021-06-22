// communicate API

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

// export interface PokemonResult {
//   name:string;
//   url:string;
// }
export class DataService {

  count: number | undefined;
  next: string | undefined;
  previous: string | undefined;
  // results: PokemonResult[] | undefined;

  url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  urlApi = 'https://pokeapi.co/api/v2/pokemon/${id}/';

//pattern
  pokemons : any[] =[];
//emettre l'array
  pokemonsSubjects = new Subject<any[]>();
  form: any;
  httpClient: any;

  constructor(
    private http:HttpClient,
  ) { }

  emitPokemons() {
    this.pokemonsSubjects.next(this.pokemons);
  }






getPokemons(offset: number) {
 let url ='https://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}';
 return this.http.get<DataService>(url)
}



getPokemonsDetail(id: number) {
  let url =`https://pokeapi.co/api/v2/pokemon/${id}`;
  return this.http.get<DataService>(this.urlApi)
 }

getPokemon() {
  return this.http.get<DataService>(this.url)
}

//Get more pokemon Data

getMoreData(name: string) {

return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  }

//Get POkemon Images

getImagePokemon(id: number){
  return this.http.get(`https://pokeres.bastionbot.org/images/pokemon/${id}.png`);
}

//appel une api poke detail

  getDetailPokemon(id: number) {
  return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }

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
