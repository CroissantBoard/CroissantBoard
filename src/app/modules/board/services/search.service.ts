import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/authentification/auth.service';
import User from 'src/app/shared/interfaces/User';
import { searchClient } from '../../../configs/algolia';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private user: User;
  query: string;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.query = '';
  }

  onQuery($event) {
    console.log('onQuery');
    this.query = $event.target.value;
  }

  clear() {
    this.query = '';
  }

  getSearchParameters(index: string) {
    const hitsPerPage = 5;

    if (this.user && this.user.role === 'admin') {
      return {
        hitsPerPage,
        query: this.query
      };
    } else if (this.user) {
      return {
        hitsPerPage,
        filters: this.createFilter(index),
        query: this.query
      };
    } else {
      return {};
    }
  }

  createConfig(index: string) {
    return {
      indexName: index,
      searchClient
    };
  }

  private createFilter(index: string) {
    let filter: string;

    switch (index) {
      case 'projects':
        filter = `participants:${this.user.uid}`;
        break;
      case 'tasks':
        filter = `createdBy:${this.user.uid} OR assignee:"${this.user.name}"`;
        break;
      case 'users':
        const projects = this.user.projects;
        filter = `NOT objectID:${this.user.uid} AND projects:${projects[0]}`;

        for (let i = 1; i < projects.length; i++) {
          filter += ` OR projects:${projects[i]}`;
        }
        break;
      case 'meetings':
        filter = `participants:${this.user.uid}`;
        break;
      default:
        break;
    }

    return filter;
  }
}
