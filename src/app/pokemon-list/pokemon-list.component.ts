import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import  firebase from "firebase/app";
import { LoggingService } from "src/app/service/logging.service";
import { PokemonService } from "src/app/service/pokemon.service";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  @ViewChild("nameInput") nameInputElementRef: ElementRef | undefined;
  pokemonName = "";

  pokemonsSubscription: Subscription | undefined;

  // addCaughtPokemon = false;
  pokemonAddListCaught = "Add a captured pokemon"
  pokemonCaughtAdded = false;

  public searchFilter: any = '';

  id: number | undefined;

  pokemons: any[] = [];

  type = '';
  pokemonsType = [{type:"All"}, {type:"grass"},  {type:"fire"},  {type:"water"},  {type:"electric"}]
  selectedType: any = this.pokemonsType[0];

  constructor(
    private dataService: DataService,
    private router: Router,
    private loggingService: LoggingService,
    private pokemonService: PokemonService
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

  onAddPokemon(element: HTMLElement) {
    this.loggingService.logItemCreated(this.pokemonName);
    this.pokemonService.addPokemon(this.pokemonName);

  }




  searchPokemon(form) {
    console.log(form.value)

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

  goToPokemonPage(index: number) {
    this.router.navigate(["/pokemon/" + index]);
  }

  // goToPokemonDetails(id) {
  //   this.router.navigate(['pokemon-item', id]);
  // }

      // add caught pokemon list

  // PokemonCapturedAddList() {
  //   this.router.navigate(['/pokemon-list', 'pokemon-caught']);
  // }

  // onViewPokemon(id: number) {
  //   this.router.navigate (['/any', 'view', id ]);
  //   console.log(this.router);
  // }

  ngOnDestroy() {
    this.pokemonsSubscription?.unsubscribe();
  }


};
