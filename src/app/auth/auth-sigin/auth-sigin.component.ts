import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service-auth/auth.service';

@Component({
  selector: 'app-auth-sigin',
  templateUrl: './auth-sigin.component.html',
  styleUrls: ['./auth-sigin.component.scss']
})
export class AuthSiginComponent implements OnInit {

    signInForm!: FormGroup;
    errorMessage: string | undefined;


    constructor
    (
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) { }

    ngOnInit(): void {
      this.initForm();
    }

    initForm() {
      this.signInForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      });
    }

    onSubmit() {
      const email = this.signInForm?.get('email')?.value;
      const password = this.signInForm?.get('password')?.value;
      this.authService.signInUser(email, password).then
      (
        () =>
          {
            this.router.navigate(['/pokemon-caught']);
          },
          (error) => {
            this.errorMessage = error;
          }
      )
    }
  }

