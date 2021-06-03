import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { HeaderComponent } from './header/header.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { PokemonCaughtComponent } from './pokemon-caught/pokemon-caught.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonItemComponent,
    PokemonListComponent,
    HeaderComponent,
    SearchFilterPipe,
    PokemonCaughtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
