import { Component  } from '@angular/core';

import { AuthService } from 'src/app/core/authentification/auth.service';
import User from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  user: User | null;
  loading = true;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.user$
    .subscribe((user) => {
      this.user = user;
      this.loading = false;
    })
  }
}
