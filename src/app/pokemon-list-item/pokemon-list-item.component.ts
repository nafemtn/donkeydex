import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../service/pokemon.service';
import { FirebaseApiService } from '../services/firebase-api.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss'],
})
export class PokemonListItemComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  favorited: boolean | undefined;
  isModifyingfirebase: boolean | undefined;
  constructor(private firebaseApi: FirebaseApiService) {}

  ngOnInit(): void {}

  onFavoriteToggle = ($event: MouseEvent) => {
    $event.stopPropagation();
    if(this.isModifyingfirebase) return;

    this.isModifyingfirebase = true;
    if (this.favorited) {
      if (!this.pokemon) return;
      this.firebaseApi.deletePokemon(this.pokemon.firebaseId)?.subscribe();
        this.isModifyingfirebase = false;
    } else {
      this.firebaseApi.postPokemon(this.pokemon).subscribe(
        (postResult) => {
          if (!this.pokemon) return;
          this.pokemon.firebaseId = postResult.name;
          this.isModifyingfirebase = false;
        },
        (error) => console.log(error)
      );
    }
     this.favorited = !this.favorited;
  };
}
