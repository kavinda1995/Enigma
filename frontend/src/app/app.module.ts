import { AuthStaticEffects } from './store/effects/static/user.effects';
import { PlaylistStaticEffects } from './store/effects/static/playlist.effects';
import { PlaylistEffects } from './store/effects/firebase/playlist.effects';
import { ArtistsEffects } from './store/effects/firebase/artists.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment, firebase, staticData } from '../environments/environment';

import { SharedModule } from './shared/shared.module';

import { reducers, initialState } from './store/index';
import { AuthEffects } from './store/effects/firebase/user.effects';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { routes } from './app.routes';
import { PlaylistCreateComponent } from './components/playlist-create/playlist-create.component';
import { PlaylistAddSongComponent } from './components/playlist-add-song/playlist-add-song.component';
import { ArtistsStaticEffects } from './store/effects/static/artists.effects';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PlaylistCreateComponent,
    PlaylistAddSongComponent,
    PlayerComponent,
  ],
  entryComponents: [
    PlaylistCreateComponent,
    PlaylistAddSongComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([
      staticData ? AuthStaticEffects : AuthEffects,
      staticData ? ArtistsStaticEffects : ArtistsEffects,
      staticData ? PlaylistStaticEffects : PlaylistEffects,
    ]),
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers, <any>initialState),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AuthEffects,
    ArtistsEffects,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
