import { Component, OnInit } from '@angular/core';

const usersArr = [
  {uid: 1, name: 'Admin User', email: 'test@mail.com', role: 'admin'},
  {uid: 2, name: 'Oliver Green', email: 'oliver.green@mail.com', role: 'user'},
  {uid: 3, name: 'Samantha Clark', email: 'samantha.clark@mail.com', role: 'user'},
  {uid: 4, name: 'Tom Bauer', email: 'tom.bauer@mail.com', role: 'user'},
  {uid: 5, name: 'Robin Chase', email: 'robi.chase@mail.com', role: 'user'}
];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[];
  loading = true;

  constructor() { }

  ngOnInit(): void {
    this.loading = false;
    this.users = usersArr;
  }
  

}
