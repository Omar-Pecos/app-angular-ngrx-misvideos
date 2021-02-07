import { createAction, props } from '@ngrx/store';

const loadVideos = createAction('[ VIDEOS ] Load videos');
const loadVideosSuccessfully = createAction(
  '[ VIDEOS ] Load videos successfully',
  props<{ payload: any[] }>()
);
const loadVideosFail = createAction(
  '[ VIDEOS ] Load videos fail',
  props<{ payload: string }>()
);

export { loadVideos, loadVideosSuccessfully, loadVideosFail };
