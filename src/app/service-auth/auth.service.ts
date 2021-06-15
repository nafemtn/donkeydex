import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedIn = false;

  constructor() { }

//Sign IN
createNewUser(email: string, password: string)
  {
    return new Promise<void>(
      (resolve, reject) =>
        {
            firebase.auth().createUserWithEmailAndPassword(email, password).then
            (
                () =>
              {
                resolve();
              },
              (error) =>
              {
                reject(error);
              }
            );
        }
      );
  }

//Sign Up
signInUser(email: string, password: string)
  {
    return new Promise<void>(
      (resolve, reject) =>
      {
        firebase.auth().signInWithEmailAndPassword(email, password).then
        (
          () =>
          {
            resolve();
          },
            (error) =>
            {
              reject(error);
            }
        )
      }
    )
  }

//Sign Out
signOutUser() {
  firebase.auth().signOut();
}


//Se logger

login() {
  this.loggedIn = true;
}

logout() {
  this.loggedIn = false;
}

isAuthenticated (): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(this.loggedIn);
    }, 800);
  });
}


}

