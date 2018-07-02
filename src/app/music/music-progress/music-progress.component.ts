import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-music-progress',
  templateUrl: './music-progress.component.html',
  styleUrls: ['./music-progress.component.css']
})
export class MusicProgressComponent {

  constructor() { }

  // Played
  @Input() elapsed: string;
  // Total time
  @Input() total: string;
  // Current time for the progress bar
  @Input() current: number;

}
