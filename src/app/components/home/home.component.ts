import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VideoState, Video } from 'src/app/models';
import { loadVideos, createVideo } from 'src/app/redux/actions';
//import { getVideos, getStatus, getError } from 'src/app/redux/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public status!: string;
  public error: string = '';
  public formVideo: Video;

  videos$: Observable<Video[]>;
  status$: Observable<string>;
  error$: Observable<string>;

  constructor(private _store: Store<{ videoState: VideoState }>) {
    this.formVideo = this.resetFormVideo();
    //with selectors
    // this.videos$ = this._store.pipe(select(getVideos));
    this.status$ = this._store.select((state) => state.videoState.status);
    this.videos$ = this._store.select((state) => state.videoState.videos);
    this.error$ = this._store.select((state) => state.videoState.error);
  }

  ngOnInit(): void {
    this.status$.subscribe((status) => {
      this.status = status;
    });

    this._store.dispatch(loadVideos());
  }

  ngDoCheck(): void {
    this.status$.subscribe((status) => (this.status = status));
    this.error$.subscribe((err) => (this.error = err));
  }

  resetFormVideo = () => ({
    id: 0,
    name: '',
    command: '',
    desc: '',
    url: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  onSubmit(event: Event) {
    event.preventDefault();

    this._store.dispatch(createVideo({ payload: this.formVideo }));
    this.formVideo = this.resetFormVideo();
  }
}
