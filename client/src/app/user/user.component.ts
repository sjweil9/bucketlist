import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Item } from '../item';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  active_user: User;
  complete: Item[];
  pending: Item[];

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  flip(id) {
    let permission = false;
    for (let item of this.active_user.items) {
      if (item._id === id) {
        permission = true;
        break;
      }
    }
    if (permission) {
      this._userService.flip(id, () => {
        let done = false;
        for (let idx = 0; idx < this.complete.length; idx++) {
          if (this.complete[idx]._id === id) {
            this.complete[idx].checked = !this.complete[idx].checked;
            this.pending.push(this.complete.splice(idx, 1)[0]);
            done = true;
            break;
          }
        }
        if (!done) {
          for (let idx = 0; idx < this.pending.length; idx++) {
            if (this.pending[idx]._id === id) {
              this.pending[idx].checked = !this.pending[idx].checked;
              this.complete.push(this.pending.splice(idx, 1)[0]);
              break;
            }
          }
        }
      });
    }
  }

  logout() {
    this._userService.logout();
  }

  ngOnInit() {
    this.user = new User();
    this.active_user = new User();
    this.complete = [];
    this.pending = [];
    this._userService.checkStatus( () => {
      this._router.navigateByUrl('/');
    }, () => {
      this.active_user = this._userService.user;
    });
    this._route.paramMap.subscribe(
      (params) => {
        this._userService.getOneUser(params.get('id'), (found_user) => {
          this.user = found_user;
          for (let item of this.user.items) {
            if (item.checked) {
              this.complete.push(item);
            }
            else {
              this.pending.push(item);
            }
          }
        });
      }
    );
  }

}
