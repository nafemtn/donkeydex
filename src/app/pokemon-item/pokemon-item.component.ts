import { Component, Input, OnInit, Output, OnDestroy, EventEmitter} from '@angular/core';
import { ActivatedRoute, Navigation, Router  } from '@angular/router';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { DataService } from '../service/data.service';
import {  } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from 'src/app/service/logging.service';
import { PokemonService } from 'src/app/service/pokemon.service';
import { ApiService } from "src/app/service/api.service";
import { HttpClient, HttpParams } from '@angular/common/http';
// import { pokemon } from '../pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
  bg: any= "assets/img/group.jpg";
  poki: any= "assets/img/klipartz.com.png";
  groupbg: any= "assets/img/babypoki.png";
  @Input() pokemon: any | undefined;
  @Output() evenementClicPokemon = new EventEmitter;

  nbCaught = 0;
  //pokemon: any;
  // route: any;
  id: Navigation | any;
  params: Subscription | undefined;
  private sub: any;
  evevementClicPokemon: any;
  isFetching: boolean | undefined;
  error: string | undefined;
  //router: Router | undefined;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router,
              private pokemonService: PokemonService,
              private apiService: ApiService,
              private http: HttpClient,) {}

  pokemons: any;
  ngOnInit(): void {

    // this.fetchPokemonsDetails(pokemonId);

    let id = this.router?.getCurrentNavigation();
      this.pokemons = this.dataService.getPokemonsSync();
    // this.dataService.getPokemon()
    //   .subscribe((response: any) => {
    //     console.log(response);

    //     response.results.forEach((result: { name: string; }) => {
    //       this.dataService.getMoreData(result.name)
    //         .subscribe((uniqueResponse: any) => {
    //           this.pokemons.push(uniqueResponse);
    //               console.log(this.pokemons);


    //        });
    //    });
    //   });

    //this.pokemon = new PokemonItemComponent(id:'', type:'');
    // const id = this.route.snapshot.params['id'];
    // this.dataService.getSinglePokemon(+id).then(
    //   (pokemon: any) =>
    //   {
    //     this.pokemon = pokemon;
    //   }
    // );

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.fetchPokemonsDetails(this.id);
      // (+) converts string 'id' to a number

      // this.dataService.getDetailPokemon(id)
      // .subscribe(
      //   (response: any) => {
      //     this.pokemon = response
      //   });
      // In a real app: dispatch action to load the details here.
   });

  };

  getDetailPokemon(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      }

  clicPokemon(name) {
    // this.router.navigate(['/pokemon-item', pokemon.id]);
    this.evevementClicPokemon.emit(name)
  }

  onRemoveClick() {
    if (!this.pokemon) return;
    this.apiService.deletePokemon(this.pokemon.id).subscribe(() => {
      if (!this.pokemon) return;
      this.pokemonService.removePokemon(this.pokemon);
    });
  }

  onBack() {
    this.router.navigate(['../app-pokemon-list']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
}

fetchPokemonsDetails(pokemonId: number) {
  this.http
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .subscribe((result) => {
          this.pokemon = result
          console.log(result);
        });


}

// fetchPokemons() {
//   this.isFetching = true;
//   setTimeout(() => {
//     this.apiService.fetchPokemon()
//       .subscribe((apiPokemons: Pokemon[]) => {
//         this.pokemonService.pokemons = apiPokemons;
//         this.pokemons = this.pokemonService.pokemons;
//         this.isFetching = false;
//       }, error => {
//         console.error(error);
//         this.error = error.message;
//       });
//   }, 1000);
// }

// fetchPokemonsDetails() {
//   this.isFetching = true;
//   setTimeout(() => {
//     this.apiService.fetchPokemon()
//       .subscribe((apiPokemons: Pokemon[]) => {
//         this.pokemonService.pokemons = apiPokemons;
//         this.pokemons = this.pokemonService.pokemons;
//         this.isFetching = false;
//       }, error => {
//         console.error(error);
//         this.error = error.message;
//       });
//   }, 1000);
// }
}

