
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Pokemon } from "./pokemon.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiUrl =
    "https://donkeydex-28eeb-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) {}

  postPokemon(name: string): Observable<{ name: string }> {
    return this.http.post<Pokemon>(`${this.apiUrl}/pokemons.json`, {
      name,
    });
  }

  deletePokemon(id: string) {
    return this.http.delete(`${this.apiUrl}/pokemons/${id}.json`);
  }


  fetchPokemon(): Observable<Pokemon[]> {
    return this.http
      .get<{ [key: string]: { name: string } }>(`${this.apiUrl}/pokemons.json`)
      .pipe(
        map((responseData) => {
          return Object.entries(responseData).map(([id, apiPokemon]) => {
            return <Pokemon><unknown>{
              id,
              name: apiPokemon.name,
            };
          });
        })
      );
  }
}
