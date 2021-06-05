import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'donkeyDex';
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBFjW9kiVTS4HuZsprdakBk0876f0HqkWk",
      authDomain: "pokemondonkex.firebaseapp.com",
      projectId: "pokemondonkex",
      storageBucket: "pokemondonkex.appspot.com",
      messagingSenderId: "836783035408",
      appId: "1:836783035408:web:6590ef06bb1469a6ed2695",
      measurementId: "G-7DYWY5FH11"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
