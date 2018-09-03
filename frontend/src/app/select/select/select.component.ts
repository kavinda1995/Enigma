import { Params, Router } from '@angular/router';
import { PlaylistsFilters } from './../../store/models/playlistFilters.model';
import { Artist } from './../../store/models/artist.model';
import { Genre } from './../../store/models/genre.model';
import { State } from './../../store/index';
import { Store } from '@ngrx/store';
import { Playlist } from './../../store/models/playlist.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, NgZone } from '@angular/core';
import { ArtistStateType } from './../../store/reducers/artists.reducer';
import { MAT_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';

@Component({
  selector: 'app-select-list',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  // for testing
  artists = ['Kasun Kalhara', 'Daddy', 'BnS', 'Imagine dragon', 'Imagine dragon', 'Imagine dragon', 'Imagine dragon'];
  public hasSelectedArtist: string; // selected artist ID (generated value from loop, retrive from session)
  playlists: Observable<Playlist[]>;
  artistlist: Observable<Artist[]>;
  genrelist: Observable<Genre[]>;
  artistSelected: string;
  filters: Observable<PlaylistsFilters>;
  limit = 9;

  constructor(private store: Store<State>,
              private router: Router,
              private ngZone: NgZone) {
    this.filters = store.select('filters');
    // this.playlists = store.select('playlists');
    this.artistlist = store.select('artists').map((artists: ArtistStateType) => {
      return artists.list.map(n => artists.items[n]);
    });

    console.log('----Dataaaa---- ', this.artists);
   }

  ngOnInit() {
  }

  handleFiltersChange(filters: PlaylistsFilters): void {
    this.router.navigate(['/playlists/explore', this.createParams(filters)]);
  }
  private createParams(filters: PlaylistsFilters): Params {
    const r: any = {};
    if (filters.limit) { r.limit = filters.limit; }
    return r;
  }
  incrementListSize() {
    console.log('Scrolled');
    this.handleFiltersChange({
      limit: this.limit * 2
    });
  }


  // saving artist and genre data in session(local storage)
  saveArtist(i) {
    // set the data
    localStorage.setItem('key', i);
    this.hasSelectedArtist = i;
    this.hasSelectedArtist = localStorage.getItem('key');

    console.log(i);
  }

  continue() {
    this.ngZone.run(() => {
      this.router.navigateByUrl('/user/login');
    });
  }

}
