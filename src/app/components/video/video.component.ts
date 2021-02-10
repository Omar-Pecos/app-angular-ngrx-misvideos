import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/models';

@Component({
  selector: 'VideoComponent',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  @Input() video!: Video;
  @Output() sendVideotoEdit: EventEmitter<{ id: number; video: Video }>;

  constructor() {
    this.sendVideotoEdit = new EventEmitter();
  }

  ngOnInit(): void {}

  edit(video: Video) {
    this.sendVideotoEdit.emit({
      video,
      id: video.id,
    });
  }
}
