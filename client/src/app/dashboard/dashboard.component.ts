import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

import { User } from '../user';
import { Item } from '../item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  active_user: User;
  all_users: User[];
  new_item: {
    title: string;
    description: string;
    tagged?: string;
  };

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  logout() {
    this._userService.logout();
  }

  onSubmit() {
    this._userService.createItem(this.new_item, (created_item) => {
      this.active_user.items.push(created_item);
    });
  }

  flip(id) {
    this._userService.flip(id, () => {
      for (let item of this.active_user.items) {
        if (item._id === id) {
          item.checked = !item.checked;
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.new_item = {
      title: '',
      description: ''
    };
    this.active_user = new User();
    this._userService.checkStatus( () => {
      this._router.navigateByUrl('/');
    }, () => {
      this.active_user = this._userService.user;
    });
    this._userService.getUsers( (users) => {
      this.all_users = users;
    });
  }

}
