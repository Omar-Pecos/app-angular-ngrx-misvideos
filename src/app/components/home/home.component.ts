import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadVideos,
  loadVideosFail,
  loadVideosSuccessfully,
} from 'src/app/redux/actions';
import { getVideos, getStatus, getError } from 'src/app/redux/selectors';
import VideoState from '../../models/video-state.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videos$: Observable<string[]>;
  status$: Observable<string>;
  error$: Observable<string>;

  constructor(private _store: Store<{ videoState: VideoState }>) {
    this.status$ = this._store.pipe(select(getStatus));
    this.videos$ = this._store.pipe(select(getVideos));
    this.error$ = this._store.pipe(select(getError));

    this._store.dispatch(loadVideos());
  }

  success() {
    this._store.dispatch(loadVideosSuccessfully());
  }

  fail() {
    this._store.dispatch(loadVideosFail());
  }

  ngOnInit(): void {}
}
