import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models';

@Component({
  selector: 'VideoComponent',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  @Input() video!: Video;

  constructor() {}

  ngOnInit(): void {}
}
