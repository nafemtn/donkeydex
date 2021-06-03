import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-caught',
  templateUrl: './pokemon-caught.component.html',
  styleUrls: ['./pokemon-caught.component.scss']
})
export class PokemonCaughtComponent implements OnInit {

  constructor(private dataService: DataService) { }

  pokemons: any[] = [];

  nbCaught = 0;

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
