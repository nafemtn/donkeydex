import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service-auth/auth.service';
import { PokemonService } from '../service/pokemon.service';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn = false;

  constructor(public authService: AuthService, private pokemonService: PokemonService) { }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.pokemonService.isEditingPokemon) return true;
    return confirm("Vous voulez vraiment quitter la page sans finir la création du pokémon ?");
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

}
