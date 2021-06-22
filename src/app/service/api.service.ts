
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
}
