import { ClassGetter } from '@angular/compiler/src/output/output_ast';
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
type = '';
pokemonsType = [{type:"All"}, {type:"grass"},  {type:"fire"},  {type:"water"},  {type:"electric"}]
selectedObject: any = this.pokemonsType[0];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    this.pokemons = []

    this.dataService.getPokemon()
      .subscribe(
        (response: any) => {
       // console.log(response);

        response.results.forEach((result: { name: string; }) => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqueResponse: any) => {

              // chaquen fois que je récupère un pokemon je l'add a mon dataservice
              this.dataService.addPokemon(uniqueResponse)
              // this.pokemons.push(uniqueResponse);


             /// console.log(this.pokemons);


           });
       });
      });

      this.pokemons=this.dataService.getPokemonsSync()

  };

  searchPokemon(form) {
    console.log(form.value)

  }

  addPokemonCaught() {
    this.pokemonAddListCaught = "Well Done !!";
    this.pokemonCaughtAdded = true;
  }

  pokemonRemoveListCaught() {
    this.pokemonAddListCaught =" Add to the list of captured pokemon";
  }

  filterPokemons(newvalue){

    if (newvalue === '' || !newvalue) {
      this.pokemons = this.dataService.getPokemonsSync()
    } else {
      console.log(newvalue);
      this.pokemons = this.dataService.getPokemonsByName(newvalue)
    }
  }

    filterType(){
      if (this.selectedObject.type === "All") {
        this.pokemons = this.dataService.getPokemonsSync()
      } else {
        this.pokemons = this.dataService.getPokemonsByType(this.selectedObject.type)
      }

    }
  // onUpdatePokemonName(event: Event) {
  //   console.log(event);
  //   const inputElement = event.target as HTMLInputElement;
  //     this.pokemonName = inputElement.value;
  // }

};
