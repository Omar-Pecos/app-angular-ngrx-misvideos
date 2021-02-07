import { createReducer, on } from '@ngrx/store';
import { loadVideos, loadVideosSuccessfully, loadVideosFail } from './actions';
import VideoState from '../models/video-state.model';

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
  on(loadVideosSuccessfully, (state) => ({
    status: 'success',
    videos: ['video1', 'video2'],
    error: '',
  })),
  on(loadVideosFail, (state) => ({
    ...state,
    status: 'error',
    error: 'Some error!!!',
  }))
);

export function videoReducer(state: any, action: any) {
  return _videoReducer(state, action);
}
