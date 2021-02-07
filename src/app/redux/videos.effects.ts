import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { VideoService } from '../services/video.service';
import { loadVideos, loadVideosFail, loadVideosSuccessfully } from './actions';

@Injectable()
export class VideoEffects {
  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVideos.type),
      mergeMap(() =>
        this._videoService.loadAllVideos().pipe(
          map((res) => ({
            type: loadVideosSuccessfully.type,
            payload: res.data,
          })),
          catchError((err) =>
            of({
              type: loadVideosFail.type,
              payload: err.error.error || err.message,
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private _videoService: VideoService) {}
}