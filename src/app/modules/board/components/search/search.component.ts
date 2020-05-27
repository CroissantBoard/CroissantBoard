import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import User from 'src/app/shared/interfaces/User';
import { searchClient } from '../../../../configs/algolia';
import { AuthService } from 'src/app/core/authentification/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(public authService: AuthService, public searchService: SearchService) {}
}
