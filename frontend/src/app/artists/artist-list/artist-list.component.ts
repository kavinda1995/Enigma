import { Filters } from './../../store/models/filters.model';
import { Router, Params } from '@angular/router';
import { State } from './../../store/index';
import { Store } from '@ngrx/store';
import { Artist } from './../../store/models/artist.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from '../../shared/services/shared-data.service';

import { ArtistStateType } from './../../store/reducers/artists.reducer';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  filters: Observable<Filters>;
  artists: Observable<Artist[]>;
  artistArr: any = [];
  limit = 6;
  userToken;

  constructor(private store: Store<State>,
              private router: Router,
              private http: HttpClient,
              public shared: SharedDataService,
              private ngZone: NgZone) {
    // this.userToken = this.shared.userSecret;
    this.getArtistList();
    // this.filters = store.select('filters');
    // this.artists = store.select('artists').map((artists: ArtistStateType) => {
    //   return artists.list.map(n => artists.items[n]);
    // });
  }

  ngOnInit() {
    // this.userToken = this.shared.userSecret;
    // this.getArtistList();
  }

  getArtistList() {
    this.userToken = localStorage.getItem('userSecret');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token':  this.userToken
      })
    };
    this.http.get('http://localhost:3000/songs/artists', httpOptions).subscribe(data => {
      this.artistArr = data;
    });
  }

  // handleFiltersChange(filters: Filters): void {
  //   this.router.navigate(['/artists', this.createParams(filters)]);
  // }

  // private createParams(filters: Filters): Params {
  //   const r: any = {};
  //   if (filters.limit) { r.limit = filters.limit; }
  //   return r;
  // }

  // incrementListSize() {
  //   this.handleFiltersChange({
  //     limit: this.limit * 2
  //   });
  // }
}
