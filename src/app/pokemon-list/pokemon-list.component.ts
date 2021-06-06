import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

pokemonsSubscription: Subscription | undefined;

// addCaughtPokemon = false;
pokemonAddListCaught = "Add a captured pokemon"
pokemonCaughtAdded = false;

public searchFilter: any = '';

pokemons: any[] = [];
pokemonName = '';
type = '';
pokemonsType = [{type:"All"}, {type:"grass"},  {type:"fire"},  {type:"water"},  {type:"electric"}]
selectedType: any = this.pokemonsType[0];

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.pokemons = []

    this.dataService.getPokemon()
      .subscribe(
        (response: any) => {

        response.results.forEach((result: { name: string; }) => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqueResponse: any) => {

              // des que je récupère un pokemon je l'add a mon dataservice
              this.dataService.addPokemon(uniqueResponse)


           });
       });
      });

      this.pokemons=this.dataService.getPokemonsSync()
//
      this.pokemonsSubscription = this.dataService.pokemonsSubjects.subscribe
      (
        (pokemons: any[]) =>
        {
          this.pokemons = pokemons;
        }
      );
      this.dataService.emitPokemons();



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
    if (this.selectedType.type === "All") {
      this.pokemons = this.dataService.getPokemonsSync()
    } else {
      this.pokemons = this.dataService.getPokemonsByType(this.selectedType.type)
    }

  }


      // add caught poke list

  PokemonCapturedAddList() {
    this.router.navigate(['/pokemon-list', 'pokemon-caught']);
  }

  onViewPokemon(id: number) {
    this.router.navigate (['/pokemons', 'view', id]);
  }

  ngOnDestroy() {
    this.pokemonsSubscription?.unsubscribe();
  }
};
