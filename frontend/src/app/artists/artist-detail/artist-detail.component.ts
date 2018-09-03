import { PlayerService } from './../../shared/services/player/player.service';
import { SharedDataService } from './../../shared/services/shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlaylistAddSongComponent } from './../../components/playlist-add-song/playlist-add-song.component';
import { Song } from './../../store/models/song.model';
import { Album } from './../../store/models/album.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ArtistsAlbumService } from './../services/artists-album.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Howl } from 'howler';

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
  tracks;
  slug: string;
  albums: Observable<Album[]>;

  sound;
  playing: Boolean = false;
  songs = [];
  position = 0;

  artistSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<State>,
              public dialog: MatDialog,
              private http: HttpClient,
              public shared: SharedDataService,
              private albumService: ArtistsAlbumService,
              private player: PlayerService) {
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
      this.tracks = data;
      console.log(this.artist);
    }, (error) => {
      console.log(error);
    });
  }

   /**
   * Handler to play a song.
   */
  playSong(name, link, image) {

    const track = {name: name, url: link, image: image};
    this.songs.push(link);
    console.log(this.playing);
    if (this.playing === true) {
      this.sound.stop();
    }
    // this.albumService.playSong(song);
    // this.player.songList.push(track);
    // console.log(this.player.songList);
    // this.player.playSong(track);
    if (this.playing !== true) {
      console.log(this.position);
      console.log('play');
      this.selectTrack();
      this.sound.play();
      this.playing = true;
      console.log(this.playing);
    } else {
      this.sound.stop();
      this.playing = false;
    }

  }

  selectTrack() {
    if (this.playing === true) {
      this.sound.stop();
    }
    this.sound = new Howl({
      src: [this.songs[this.position]],
      html5 : true,
      onend: () => {
        this.next();
      }
    });
    this.playing = true;
  }

  play() {
    if (this.playing !== true) {
      console.log(this.position);
      this.selectTrack();
      this.sound.play();
      this.playing = true;
    } else {
      this.sound.stop();
      this.playing = false;
    }
  }

  next() {
    this.sound.stop();
    this.playing = false;
    if (this.position === 3) {
      this.position = 1;
    } else {
      this.position = this.position + 1;
    }
    this.play();
  }

  previous() {
    this.sound.stop();
    this.playing = false;
    if (this.position === 1) {
      this.position = 3;
    } else {
      this.position = this.position - 1;
    }
    this.play();
  }

  /**
   * Play this album
   */
  playAlbum() {
    this.albumService.playAlbum(this.album, this.songs);
  }

  /**
   * Add song to a playlist.
   */
  addSongToPlaylist(song: Song) {
    this.onAddSong.emit(song);
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
