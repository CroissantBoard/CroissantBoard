import { Component, OnInit } from '@angular/core';
import { searchClient } from '../../../../configs/algolia';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  config = {
    indexName: 'tasks',
    searchClient
  };

  constructor() {}

  ngOnInit(): void {}
}
// && results.query.length > 0
