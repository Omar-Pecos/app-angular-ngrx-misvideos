import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { VideoService } from '../services/video.service';
import {
  loadVideos,
  loadVideosFail,
  loadVideosSuccessfully,
  createVideo,
  createVideoSuccessfully,
  createVideoFail,
  editVideo,
  editVideoSuccessfully,
  editVideoFail,
} from './actions';

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

  createVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createVideo.type),
      mergeMap(({ payload: newVideo }) =>
        this._videoService.createVideo(newVideo).pipe(
          map((res) => ({
            type: createVideoSuccessfully.type,
            payload: res.data,
          })),
          catchError((err) =>
            of({
              type: createVideoFail.type,
              payload: err.error.error || err.message,
            })
          )
        )
      )
    )
  );

  editVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editVideo.type),
      mergeMap(({ id, payload: editedVideo }) =>
        this._videoService.editVideo(id, editedVideo).pipe(
          map((res) => ({
            type: editVideoSuccessfully.type,
            payload: res.data,
          })),
          catchError((err) =>
            of({
              type: editVideoFail.type,
              payload: err.error.error || err.message,
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private _videoService: VideoService) {}
}
