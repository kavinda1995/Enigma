import { Howl } from 'howler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  sound;
  playing: Boolean = false;

  songs = [
    'http://34.238.149.235/EnigmaMusic/Daddy_Aradhana_ananmanan.lk.mp3',
    'http://34.238.149.235/EnigmaMusic/Kumariya-Numba-Harinda-Samarasekara-Music.lk.mp3',
    'http://34.238.149.235/EnigmaMusic/BnS_Mal_Pan_Podak.mp3'
  ];

  position = 1;
  duration = 0;

  constructor() {
  }

  selectTrack() {
    this.sound = new Howl({
      src: [this.songs[this.position - 1]],
      html5 : true,
      onend: () => {
        this.next();
      },
      onload: () => {
        this.duration = this.sound._duration;
      }
    });
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

  getLength() {
    this.sound.length();
  }

}
