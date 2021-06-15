import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCaughtComponent } from './pokemon-caught/pokemon-caught.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon-caught', component: PokemonCaughtComponent},
  { path: 'pokemon-item', component: PokemonItemComponent},
  { path: 'pokemon-list', component: PokemonListComponent },
  { path: 'pokemon-item/:id', component: PokemonItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
