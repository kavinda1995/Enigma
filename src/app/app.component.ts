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
    'https://www.music.lk/starter.php?file_id=21439&file_path=www.mlk1.info/audio/71000/starter.php?file=&file_name=Kumariya-Numba-Harinda-Samarasekara-Music.lk.mp3',
    'http://ananmanan1.com/mp3/201411/Daddy_Aradhana_ananmanan.lk.mp3',
    'http://topbadu.net/sinhala_mp3/BnS_Mal_Pan_Podak.mp3'
  ];

  position = 1;

  constructor() {
  }

  selectTrack() {
    this.sound = new Howl({
      src: [this.songs[this.position - 1]],
      html5 : true
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
    if (this.position === 3) {
      this.position = 1;
    } else {
      this.position = this.position + 1;
    }
    this.play();
  }

}
