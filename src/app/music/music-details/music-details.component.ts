import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.css']
})
export class MusicDetailsComponent {

  constructor() { }

  @Input() title: string;

}
