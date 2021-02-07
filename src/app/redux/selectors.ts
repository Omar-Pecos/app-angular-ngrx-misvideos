import { createFeatureSelector, createSelector } from '@ngrx/store';
import VideoState from '../models/video-state.model';

export const getVideoState = createFeatureSelector<VideoState>('videoState');

export const getStatus = createSelector(
  getVideoState,
  (state: VideoState) => state.status
);

export const getVideos = createSelector(
  getVideoState,
  (state: VideoState) => state.videos
);

export const getError = createSelector(
  getVideoState,
  (state: VideoState) => state.error
);
