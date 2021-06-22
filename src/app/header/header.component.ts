import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service-auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCollapsed = true;
  pokeLogo : any= "assets/img/ballLogo.png";
  isAuth: boolean | undefined;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {

  }

  onSignOut() {
    // this.authService.signOutUser();
  }
}
