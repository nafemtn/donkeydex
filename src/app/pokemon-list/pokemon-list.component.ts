import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
pokemons: any[] = [];

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
};
