import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../service/pokemon.service';
import {  EMPTY, Observable } from  'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {
apiUrl = "https://donkeydex-28eeb-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) { }

  postPokemon(pokemon: Pokemon | undefined): Observable<any> {
    console.log(pokemon)
    if (!pokemon) return EMPTY;
    console.log('test 2');
    return this.http.post<Pokemon>(`${this.apiUrl}/pokemons.json`, pokemon);
  }

  deletePokemon(id: string | undefined) {
    if (id === undefined) return;
    return this.http.delete(`$this.apiUrl}/pokemons/$
    (id).json`);
  }



}
