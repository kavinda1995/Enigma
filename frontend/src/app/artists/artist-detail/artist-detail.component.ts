import { SharedDataService } from './../../shared/services/shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlaylistAddSongComponent } from './../../components/playlist-add-song/playlist-add-song.component';
import { Song } from './../../store/models/song.model';
import { Album } from './../../store/models/album.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { State } from './../../store/index';
import { Store } from '@ngrx/store';

import { Artist } from './../../store/models/artist.model';
import { CONSOLE } from '@ngrx/effects/src/tokens';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist;
  slug: string;
  albums: Observable<Album[]>;

  artistSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<State>,
              public dialog: MatDialog,
              private http: HttpClient,
              public shared: SharedDataService) {
    this.artistSubscription = store.select('artists').subscribe(artists => {
      this.slug = route.snapshot.paramMap.get('slug');
      console.log(this.slug);
      this.getArtistTracks(this.slug);
      // this.artist = artists.items[this.slug];
    });

    // this.albums = store.select('albums').map(albums => {
    //   return typeof albums[this.slug] !== 'undefined' ? albums[this.slug] : [];
    // });
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
      console.log(this.slug);
      this.getArtistTracks(this.slug);
  }

  getArtistTracks(slug) {
    const artistData = {
      'artistName' : slug
    };

    const usertoken = localStorage.getItem('userSecret');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token':  usertoken
      })
    };

    this.http.post('http://localhost:3000/songs/artistSongs', artistData, httpOptions).subscribe((data) => {
      console.log(data);
      this.artist = data;
      this.artist = this.artist[0];
      console.log(this.artist);
    }, (error) => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.artistSubscription.unsubscribe();
  }

  /**
   * Add song to playlist.
   *
   * @param song
   *  song to add.
   */
  addSongToPlaylist(song: Song) {
    const dialogRef = this.dialog.open(PlaylistAddSongComponent, {
      width: '350px',
      data: {
        song: song,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }
}
