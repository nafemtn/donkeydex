import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pokemon, PokemonService } from 'src/app/service/pokemon.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit, OnDestroy {

  pokemon: Pokemon | undefined;
  paramsSubscription: Subscription | undefined;
  queryParamsSubscription: Subscription | undefined;
  fragmentSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) { }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

  handleRouteParams = (params: Params) => {
    const pokemonId = params["id"];
    this.pokemon = {
      id: pokemonId,
      name: this.pokemonService.pokemons[pokemonId].name,
      type: this.pokemonService.pokemons[pokemonId].type,
      types: this.pokemonService.pokemons[pokemonId].types,
      sprites: this.pokemonService.pokemons[pokemonId].sprites,
    }
  }

  handleQueryParams(queryParams: Params) {
    console.log("query parameters !");
    console.log(queryParams);
  }

  handleFragment(fragment: string) {
    console.log("fragment : " + fragment);
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(this.handleRouteParams);
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(this.handleQueryParams);
    this.fragmentSubscription = this.activatedRoute.fragment.subscribe(this.handleFragment);
  }
}
