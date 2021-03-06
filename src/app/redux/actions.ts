import { createAction, props } from '@ngrx/store';
import { Video } from '../models';

const loadVideos = createAction('[ VIDEOS ] Load videos');
const loadVideosSuccessfully = createAction(
  '[ VIDEOS ] Load videos successfully',
  props<{ payload: Video[] }>()
);
const loadVideosFail = createAction(
  '[ VIDEOS ] Load videos fail',
  props<{ payload: string }>()
);

const createVideo = createAction(
  '[ VIDEOS ] Create Video',
  props<{ payload: Video }>()
);
const createVideoSuccessfully = createAction(
  '[ VIDEOS ] Create Video successfully',
  props<{ payload: Video }>()
);
const createVideoFail = createAction(
  '[ VIDEOS ] Create Video fail',
  props<{ payload: string }>()
);

const editVideo = createAction(
  '[ VIDEOS ] Edit Video',
  props<{ id: number; payload: Video }>()
);
const editVideoSuccessfully = createAction(
  '[ VIDEOS ] Edit Video successfully',
  props<{ payload: Video }>()
);
const editVideoFail = createAction(
  '[ VIDEOS ] Edit Video fail',
  props<{ payload: string }>()
);

const deleteVideo = createAction(
  '[ VIDEOS ] Delete Video',
  props<{ id: number }>()
);
const deleteVideoSuccessfully = createAction(
  '[ VIDEOS ] Delete Video successfully',
  props<{ payload: Video }>()
);
const deleteVideoFail = createAction(
  '[ VIDEOS ] Delete Video fail',
  props<{ payload: string }>()
);

export {
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
};
