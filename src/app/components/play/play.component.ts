import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Video, VideoState } from 'src/app/models';
import { loadVideos } from 'src/app/redux/actions';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit {
  public videoId: string = '';
  public videoUrl: SafeResourceUrl = '';

  videos$: Observable<Video[]>;

  constructor(
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _store: Store<{ videoState: VideoState }>
  ) {
    this.videos$ = this._store.select((state) => state.videoState.videos);

    this._route.params.subscribe((params) => {
      const { video_id: id } = params;
      this.videoId = id;
    });
  }

  ngOnInit(): void {
    if (this.videoId) {
      let url = 'https://www.youtube.com/embed/' + this.videoId;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      this._store.dispatch(loadVideos());
    }
  }

  openVideo(url: string) {
    //url tipo https://www.youtube.com/watch?v=_iDGTE4YBSA
    let id = url.split('=')[1];

    if (!id) {
      //url tipo  https://youtu.be/mrDGEwrkTFk
      id = url.split('/')[3];
    }

    if (id) {
      this.videoId = id;
      let url = 'https://www.youtube.com/embed/' + this.videoId;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      alert('Url posiblemente no válida');
    }
  }
}
