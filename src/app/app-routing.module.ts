import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music/music-player/music-player.component';
import { Router, Routes } from '@angular/router';
// import { HeroesComponent }      from './heroes/heroes.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule {

  routes: Routes = [
    { path: 'player', component: MusicPlayerComponent }
  ];

}

// client id - 36acdddd306c723d73a96a9b4a6b8d41; client secret - 9a9b3bb335d406526ccc296d283caccc
