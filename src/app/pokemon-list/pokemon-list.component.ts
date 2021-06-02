import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
pokemons: any[] = [];
page = 1;
totalPokemons: number | undefined ;


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getPokemon()
      .subscribe((response: any) => {
        this.totalPokemons = response.count;

        response.results.forEach((result: { name: any; }) => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqueResponse: any) => {
              this.pokemons.push(uniqueResponse);
              console.log(this.pokemons);

            });
        });
      });
  }

}
