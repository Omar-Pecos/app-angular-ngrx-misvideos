import { createReducer, on } from '@ngrx/store';
import {
  loadVideos,
  loadVideosSuccessfully,
  loadVideosFail,
  createVideo,
  createVideoSuccessfully,
  createVideoFail,
  editVideo,
  editVideoSuccessfully,
  editVideoFail,
  deleteVideo,
  deleteVideoSuccessfully,
  deleteVideoFail,
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
  })),

  on(editVideo, (state) => ({
    ...state,
    status: 'loading',
    error: '',
  })),
  on(editVideoSuccessfully, (state, { payload }) => ({
    ...state,
    status: 'success',
    videos: state.videos.map((video) => {
      if (video.id == payload.id) video = payload;

      return video;
    }),
    error: '',
  })),
  on(editVideoFail, (state, { payload }) => ({
    ...state,
    status: 'error',
    error: payload,
  })),

  on(deleteVideo, (state) => ({
    ...state,
    status: 'loading',
    error: '',
  })),
  on(deleteVideoSuccessfully, (state, { payload }) => ({
    ...state,
    status: 'success',
    videos: state.videos.filter((video) => video.id != payload.id),
    error: '',
  })),
  on(deleteVideoFail, (state, { payload }) => ({
    ...state,
    status: 'error',
    error: payload,
  }))
);

export function videoReducer(state: any, action: any) {
  return _videoReducer(state, action);
}
