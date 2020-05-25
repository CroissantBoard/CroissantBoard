import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  constructor() { }

  @Input() user;

  ngOnInit(): void {    
  }

  handelRemove(uid: string):void {
    console.log('delete user with id: ', uid);
  }

}
