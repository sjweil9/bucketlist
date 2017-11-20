import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { User } from './user';
import { Item } from './item';

@Injectable()
export class UserService {

  user?: User;

  constructor(
    private _http: Http,
    private _router: Router
  ) {
  }

  logInUser(name) {
    this._http.post('/users', {name: name}).subscribe(
      (res) => {
        if ('_id' in res.json()) {
          this.user = res.json();
          this._router.navigateByUrl('/dashboard');
        }
      },
      (err) => {
        console.log(err.json());
      }
    );
  }

  logout() {
    this._http.get('/logout').subscribe();
    this._router.navigateByUrl('/');
  }

  getUsers(callback) {
    this._http.get('/users').subscribe(
      (res) => {
        let users = res.json();
        for (let i = 0; i !== users.length; i++) {
          if (users[i]._id == this.user._id) {
            users.splice(i, 1);
            break;
          }
        }
        callback(users);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getOneUser(id, callback) {
    const url = '/users/' + id;
    this._http.get(url).subscribe(
      (res) => {
        callback(res.json());
      },
      (err) => {
        console.log(err);
        this._router.navigateByUrl('/dashboard');
      }
    );
  }

  checkStatus(redirect, success) {
    if (!this.user) {
      this._http.get('/session').subscribe(
        (res) => {
          if (!('_id' in res.json())) {
            redirect();
          }
          else {
            this.user = res.json();
            success();
          }
        },
        (err) => {
          redirect();
        }
      );
    }
    else {
      success();
    }
  }

  createItem(item, callback) {
    const url = '/items/create/' + this.user._id;
    this._http.post(url, item).subscribe(
      (res) => {
        callback(res.json());
      },
      (err) => {
        console.log(err);
      }
    );
  }

  flip(id, callback) {
    const url = '/items/' + id;
    this._http.get(url).subscribe(
      (res) => {
        callback();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
