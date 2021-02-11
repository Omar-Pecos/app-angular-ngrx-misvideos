import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models';

@Component({
  selector: 'VideoComponent',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  @Input() video!: Video;
  @Output() sendVideotoEdit: EventEmitter<{ id: number; video: Video }>;
  @Output() sendVideotoDelete: EventEmitter<{ id: number; video: Video }>;

  constructor(private _router: Router) {
    this.sendVideotoEdit = new EventEmitter();
    this.sendVideotoDelete = new EventEmitter();
  }

  ngOnInit(): void {}

  edit(video: Video) {
    this.sendVideotoEdit.emit({
      video,
      id: video.id,
    });
  }

  delete(video: Video) {
    this.sendVideotoDelete.emit({
      video,
      id: video.id,
    });
  }

  goToVideo(url: string) {
    //url tipo https://www.youtube.com/watch?v=_iDGTE4YBSA
    let id = url.split('=')[1];

    if (!id) {
      //url tipo  https://youtu.be/mrDGEwrkTFk
      id = url.split('/')[3];
    }
    if (id) this._router.navigateByUrl('/player/' + id);
    else {
      alert('Url posiblemente no válida');
    }
  }
}
