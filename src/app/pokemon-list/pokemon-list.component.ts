import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

// addCaughtPokemon = false;
pokemonAddListCaught = "Add a captured pokemon"
pokemonCaughtAdded = false;

public searchFilter: any = '';

pokemons: any[] = [];
pokemonName = '';



  constructor(
    private dataService: DataService
  ) { }



  ngOnInit(): void {



    this.dataService.getPokemon()
      .subscribe((response: any) => {
        console.log(response);

        response.results.forEach((result: { name: string; }) => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqueResponse: any) => {
              this.pokemons.push(uniqueResponse);
                  console.log(this.pokemons);


           });
       });
      });

  };

  searchPokemon(form) {
    console.log(form.value)

  }

  addPokemonCaught() {
    this.pokemonAddListCaught = "Well Done !!";
    this.pokemonCaughtAdded = true;
  }

  pokemonRemoveListCaught() {
    this.pokemonAddListCaught ="Add a captured pokemon";
  }

  // onUpdatePokemonName(event: Event) {
  //   console.log(event);
  //   const inputElement = event.target as HTMLInputElement;
  //     this.pokemonName = inputElement.value;
  // }

};
