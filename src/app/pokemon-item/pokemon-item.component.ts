import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { DataService } from '../service/data.service';
// import { pokemon } from '../pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {

  pokemon: any;
  route: any;

  constructor(private dataService: DataService,
              private router: Router) {}

  pokemons: any[] = [];

  ngOnInit(): void {
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

    // this.pokemon = new any(name:'', type:'');
    const id = this.route.snapshot.params['id'];
    this.dataService.getSinglePokemon(+id).then(
      (pokemon: any) =>
      {
        this.pokemon = pokemon;
      }
    )
  };

  onBack() {
    this.router.navigate(['/pokemons']);
  }


};
