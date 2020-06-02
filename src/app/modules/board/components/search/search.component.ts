import { Component } from '@angular/core';

import { AuthService } from 'src/app/core/authentification/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  showResults: boolean;

  constructor(
    public authService: AuthService,
    public searchService: SearchService
  ) {
    this.showResults = false;
  }

  hideResults(): void {
    this.showResults = false;
  }
}
