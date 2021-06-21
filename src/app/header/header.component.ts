import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service-auth/auth.service';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCollapsed = true;
  pokeLogo : any= "assets/img/pikachu.png";
  isAuth: boolean | undefined;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged
    (
      (user) => {
        if(user)
        {
          this.isAuth = true;
        } else
          {
          this.isAuth = false;
          }

        }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
