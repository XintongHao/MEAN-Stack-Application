import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private api: ApiService) { }

  users: any;

  displayedColumns = ['googleID', 'username', 'email'];
  dataSource = new UserDataSource(this.api);

  ngOnInit() {
    this.api.getUsers()
      .subscribe(res => {
        console.log(res);
        this.users = res;
      }, err => {
        console.log(err);
      });
  }
}

export class UserDataSource extends DataSource <any> {
  constructor(private api: ApiService) {
    super();
  }
  connect() {
    return this.api.getUsers();
  }
  disconnect() {

  }
}
