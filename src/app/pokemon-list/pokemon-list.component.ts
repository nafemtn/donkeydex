import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { PokemonService, Pokemon } from "src/app/service/pokemon.service";
import { ApiService } from '../service/api.service';
import { EventEmitter } from 'events';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  bgList: any= "assets/img/groupet.jpg";
  ball: any= "assets/img/pokeball.png";

  @ViewChild("nameInput") nameInputElementRef: ElementRef | undefined;
  @Input() pokemon = {};
  @Output() evevementClicPokemon = new EventEmitter;

  // apiPokemons: Pokemon[] = [];
  // apiUrlImage = "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png";
  // error: string | undefined;

  pokemonsSubscription: Subscription | undefined;
  pokemonSelectionne;
  // addCaughtPokemon = false;
  pokemonAddListCaught = "Add a captured pokemon"
  pokemonCaughtAdded = false;
  public pokemonCaught: any;
  page = 1;
  totalPokemons: number | undefined ;

  public searchFilter: any = '';
  id!: number |  any;
  pokemons: Pokemon[] = [];
  pokemonss: any[] = [];
  isFetching = false;

//filter by type
  type = '';
  pokemonsType = [{type:"All"}, {type:"grass"},  {type:"fire"},  {type:"water"},  {type:"electric"}, {type:"poison"},  {type:"flying"}, {type:"ground"}, {type:"bug"}, {type:"fairy"}, {type:"fighting"}, {type:"psychic"}, ];
  selectedType: any = this.pokemonsType[0];
//
// Get Images
// imgUrl: string ='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png';
// imageToShow: any[] = [];
// isImageLoading: boolean | undefined;
//
  http: any;
  apiPokemons: any[] | undefined;
  pokemonId!: string;
  pokemonType!: string;
  pokemonName: any;
  firestore: any;

  scrollDistance = 1;
  scrollUpDistance = 2;
  isfetchingScroll = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private pokemonService: PokemonService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {

    // for (let i=1; i<=20; i++){
    //   this.pokemonss.push(i)
    // }
    console.log(this.pokemons)

    this.pokemons = []
//

    this.dataService.getPokemon()
      .subscribe(
        (pokemonResponse: any) => {
          this.pokemon = pokemonResponse

          pokemonResponse.results.forEach((pokemons: any) => {
          this.dataService.getMoreData(pokemons.name)
            .subscribe((pokemonDetail: any) => {
              // des que je récupère un pokemon je l'add a mon dataservice
              this.dataService.addPokemon(pokemonDetail)
                });

      });
      });
//

//
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

/*   fetchPokemons() {
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
  } */

  goToPokemonPage(index: number) {
    this.router.navigate(["/pokemon", index], {
      queryParams: { allowEdit: 1 },
      fragment: 'test' });
  }

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


  onSubmit() {

    //form?

    this.dataService.form.value.coffeeOrder = this.dataService;
      let data = this.dataService.form.value;

  }


//  getImageFromService(id: number) {
//   this.isImageLoading = true;
//   this.dataService.getImage(this.imgUrl).subscribe(data => {
//     this.createImageFromBlob(data);
//     this.isImageLoading = false;
//   }, error => {
//     this.isImageLoading = false;
//     console.log(error);
//   });
// }

// getImage(id: number): Observable<Pokemon> {
//   return this.httpClient.get('http://myip/image/'+id, {responseType: "blob"});
// }

fetchPokemonImage(id:number) {
  // this.http.get(`https://pokeres.bastionbot.org/images/pokemon/${id}.png`).subscribe((result: any) => {
  //   const pokemon = result.results[0];
    this.http.get(`https://pokeapi.co/api/v2/pokemon/pokemon/${id}`).subscribe((result) => {
      console.log(result);
    })

}

onFavoriteToggle = () => {
  console.log("favorite !");
}

// onScroll() {
//   const length = this.pokemons.length;
//   // setTimeout(()=> {
//   //   const p:any = ' '.repeat(20).split('').map((s, i)=> i + 1 + length);
//   //   while(p.length) this.pokemons.push(p.shift());
//   // }, 1000)
//   console.log("toto");
// }

onScroll= ($event) => {
  console.log('scroll');
  if (this.isfetchingScroll) return;

  // this.dataService.getPokemons().subscribe(pokemons) => {
  //   this.pokemons = [...this.pokemons, ...pokemons];
  //   console.log(this.pokemons)

  // this.dataService.getPokemon()
  //     .subscribe(
  //       (pokemonResponse: any) => {
  //         this.pokemon = pokemonResponse
  //         this.isfetchingScroll = true;

  //         pokemonResponse.results.forEach((pokemons: any) => {
  //         this.dataService.getMoreData(pokemons.name)
  //           .subscribe((pokemonDetail: any) => {
  //             // des que je récupère un pokemon je l'add a mon dataservice
  //             this.dataService.addPokemon(pokemonDetail)
  //               });
  //           this.isfetchingScroll = false;

  //     });
  //     });

  }



};
