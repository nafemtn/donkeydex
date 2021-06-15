import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCaughtComponent } from './pokemon-caught/pokemon-caught.component';
import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { GeneralComponent } from './general/general.component';
import { StatsComponent } from './stats/stats.component';
import { EvolutionComponent } from './evolution/evolution.component';

const routes: Routes =
[
  { path: '', component: PokemonListComponent },
  { path: 'pokemon-caught', component: PokemonCaughtComponent},
  { path: 'pokemon-item', component: PokemonItemComponent},
  { path: 'pokemon-list', component: PokemonListComponent },
  { path: 'pokemon-item/:id', component: PokemonItemComponent },
  { path: "", component: HomeComponent },
  { path: "pokemon", component: PokemonComponent},

  {
    path: "pokemon/:id",
    component: PokemonComponent,
    children:
      [
        { path: "general", component: GeneralComponent},
        { path: "stats", component: StatsComponent},
        { path: "evolutions", component: EvolutionComponent},
        { path: "evolutions", component: EvolutionComponent}
      ]
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
