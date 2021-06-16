import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import  firebase from "firebase/app";
import { PokemonService, Pokemon } from "src/app/service/pokemon.service";
import { map } from "rxjs/operators";
import { ApiService } from '../service/api.service';
import { EventEmitter } from 'events';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  @ViewChild("nameInput") nameInputElementRef: ElementRef | undefined;
  @Input() pokemon = {};
  @Output() evevementClicPokemon = new EventEmitter;

  // apiPokemons: Pokemon[] = [];
  apiUrl =
    "https://donkeydex-28eeb-default-rtdb.europe-west1.firebasedatabase.app/";
    error: string | undefined;

  pokemonsSubscription: Subscription | undefined;
  pokemonSelectionne;
  // addCaughtPokemon = false;
  pokemonAddListCaught = "Add a captured pokemon"
  pokemonCaughtAdded = false;
  public pokemonCaught: any;

  public searchFilter: any = '';
  id!: number |  any;
  pokemons: any[] = [];
  isFetching = false;

  type = '';
  pokemonsType = [{type:"All"}, {type:"grass"},  {type:"fire"},  {type:"water"},  {type:"electric"}];
  selectedType: any = this.pokemonsType[0];

  http: any;
  apiPokemons: any[] | undefined;
  pokemonId!: string;
  pokemonType!: string;
  pokemonName: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private pokemonService: PokemonService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {

    this.pokemons = []
    this.fetchPokemons();
//

    this.dataService.getPokemon()
      .subscribe(
        (response: any) => {
          this.pokemon = response

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

      this.dataService.getPokemonCaught()
      .subscribe(
        (response: any) => (this.pokemonCaught = response))

  };

  getPokemonCaught = () =>
  this.dataService
    .getPokemonCaught()
    .subscribe(response => (this.pokemonCaught = response));

  // onPokemonNameType() {
  //   this.pokemonService.isEditingPokemon = this.pokemonName !== "";
  //   console.log(this.pokemonName);
  // }

  searchPokemon(form) {
    console.log(form.value)
  }

  filterPokemons(newvalue: any){

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

  onAddPokemon(element: HTMLElement) {
    this.apiService.postPokemon(this.pokemonName)
      .subscribe((responseData: any) => {
        this.pokemonService.addPokemon(this.pokemonName, this.pokemonId, this.pokemonType);
        this.pokemonName = "";
        this.pokemonType = "";
        this.pokemonId = "";
        this.pokemonService.isEditingPokemon = false;
  });
}

  fetchPokemons() {
    this.isFetching = true;
    setTimeout(() => {
      this.apiService.fetchPokemon()
        .subscribe((apiPokemons: Pokemon[]) => {
          this.pokemonService.pokemons = apiPokemons;
          this.pokemons = this.pokemonService.pokemons;
          this.isFetching = false;
        }, error => {
          console.error(error);
          this.error = error.message;
        });
    }, 1000);
  }


  goToPokemonPage(index: number) {
    this.router.navigate(["/pokemon", index], {
      queryParams: { allowEdit: 1 },
      fragment: 'test' });
  }

  //

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
