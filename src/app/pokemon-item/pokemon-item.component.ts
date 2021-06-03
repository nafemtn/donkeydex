import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {

  constructor(private dataService: DataService) {}

  pokemons: any[] = [];

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
