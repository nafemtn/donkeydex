import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree, } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../service-auth/auth.service";

@Injectable
({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService,) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {  return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) return true;
      this.router.navigate(["/"]);
      return false;
    });
  }




    // return new Promise(
    //   (resolve, reject) => {
    //     firebase.auth().onAuthStateChanged(
    //       (user) => {
    //         if(user) {
    //           resolve(true);
    //         } else {
    //           this.router.navigate(['/auth', 'sigin']);
    //           resolve(false);
    //         }
    //       }
    //     )
    //   }
    // )





}
