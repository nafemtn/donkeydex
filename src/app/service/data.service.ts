// communicate API

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http:HttpClient
  ) { }


//Get Pokémons

getPokemon() {
  return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
}

//Get more pokemon Data

getMoreData(name: string) {

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

}

}
