import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit, AfterViewInit {

  @ViewChild('userForm') userForm: NgForm | undefined
  showPassword: boolean | undefined

  constructor() { }
  ngAfterViewInit(): void {
    console.log(this.userForm);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.userForm)
  }

}
