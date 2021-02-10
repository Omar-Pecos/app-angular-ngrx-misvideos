import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VideoState, Video } from 'src/app/models';
import { loadVideos } from 'src/app/redux/actions';
//import { getVideos, getStatus, getError } from 'src/app/redux/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public status!: string;
  public error: string = '';

  videos$: Observable<Video[]>;
  status$: Observable<string>;
  error$: Observable<string>;

  constructor(private _store: Store<{ videoState: VideoState }>) {
    //with selectors
    // this.videos$ = this._store.pipe(select(getVideos));

    this.status$ = this._store.select((state) => state.videoState.status);
    this.videos$ = this._store.select((state) => state.videoState.videos);
    this.error$ = this._store.select((state) => state.videoState.error);

    this.status$.subscribe((status) => {
      this.status = status;
    });
  }

  ngOnInit(): void {
    this._store.dispatch(loadVideos());
  }

  ngDoCheck(): void {
    this.status$.subscribe((status) => (this.status = status));
    this.error$.subscribe((err) => (this.error = err));
  }
}
