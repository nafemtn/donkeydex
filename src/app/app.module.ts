import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  firebase from "firebase/app";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { HeaderComponent } from './header/header.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { PokemonCaughtComponent } from './pokemon-caught/pokemon-caught.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthSiginComponent } from './auth/auth-sigin/auth-sigin.component';
import { AuthService } from './service-auth/auth.service';
import { DataService } from './service/data.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service-auth/auth-guard.service';
import { HighlightDirective } from './highlight.directive';

const appRoutes: Routes = [
  {path: 'auth-signup', component: AuthSignupComponent },
  {path: 'auth-sigin', component: AuthSiginComponent },
  {path: 'pokemon-list', canActivate: [AuthGuardService], component: PokemonListComponent },
  {path: 'pokemon-item', canActivate: [AuthGuardService], component: PokemonItemComponent  },
  {path: 'pokemon-caught', canActivate: [AuthGuardService], component: PokemonCaughtComponent },
  {path: 'pokemon-list/:id', canActivate: [AuthGuardService], component: PokemonItemComponent },
  {path: '', redirectTo: 'pokemon-list', pathMatch: 'full'},
  {path: '**', redirectTo: 'pokemon-list'},
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonItemComponent,
    PokemonListComponent,
    HeaderComponent,
    SearchFilterPipe,
    PokemonCaughtComponent,
    AuthSignupComponent,
    AuthSiginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
