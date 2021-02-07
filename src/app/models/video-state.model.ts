import { Video } from '.';

export default interface VideoState {
  status: string;
  videos: Video[];
  error: string;
}
