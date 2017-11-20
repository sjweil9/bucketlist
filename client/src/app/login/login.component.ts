import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;

  constructor(private _userService: UserService) {
    this.name = '';
  }

  ngOnInit() {
  }

  onSubmit() {
    this._userService.logInUser(this.name);
  }

}
