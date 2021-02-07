import { createAction } from '@ngrx/store';

const loadVideos = createAction('[ VIDEOS ] Load videos');
const loadVideosSuccessfully = createAction(
  '[ VIDEOS ] Load videos successfully'
);
const loadVideosFail = createAction('[ VIDEOS ] Load videos fail');

export { loadVideos, loadVideosSuccessfully, loadVideosFail };
