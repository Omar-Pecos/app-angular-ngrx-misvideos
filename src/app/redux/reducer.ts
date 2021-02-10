import { createReducer, on } from '@ngrx/store';
import {
  loadVideos,
  loadVideosSuccessfully,
  loadVideosFail,
  createVideo,
  createVideoSuccessfully,
  createVideoFail,
} from './actions';
import { VideoState } from '../models/';

export const initialState: VideoState = {
  status: 'init',
  videos: [],
  error: '',
};

const _videoReducer = createReducer(
  initialState,

  on(loadVideos, (state) => ({
    ...state,
    status: 'loading',
    error: '',
  })),
  on(loadVideosSuccessfully, (state, { payload }) => ({
    status: 'success',
    videos: payload,
    error: '',
  })),
  on(loadVideosFail, (state, { payload }) => ({
    ...state,
    status: 'error',
    error: payload,
  })),

  on(createVideo, (state) => ({
    ...state,
    status: 'loading',
    error: '',
  })),
  on(createVideoSuccessfully, (state, { payload }) => ({
    ...state,
    status: 'success',
    videos: [payload, ...state.videos],
    error: '',
  })),
  on(createVideoFail, (state, { payload }) => ({
    ...state,
    status: 'error',
    error: payload,
  }))
);

export function videoReducer(state: any, action: any) {
  return _videoReducer(state, action);
}
