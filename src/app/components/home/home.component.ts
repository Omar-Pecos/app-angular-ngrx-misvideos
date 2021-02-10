import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VideoState, Video } from 'src/app/models';
import { loadVideos, createVideo, editVideo } from 'src/app/redux/actions';
//import { getVideos, getStatus, getError } from 'src/app/redux/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public status!: string;
  public error: string = '';
  public formVideo: Video;
  public isEditing: boolean = false;
  private videoIdEditing: number = 0;

  videos$: Observable<Video[]>;
  status$: Observable<string>;
  error$: Observable<string>;

  constructor(private _store: Store<{ videoState: VideoState }>) {
    this.formVideo = this.resetFormVideo();
    //with selectors
    // this.videos$ = this._store.pipe(select(getVideos));
    this.status$ = this._store.select((state) => state.videoState.status);
    this.videos$ = this._store.select((state) => state.videoState.videos);
    this.error$ = this._store.select((state) => state.videoState.error);
  }

  ngOnInit(): void {
    this.status$.subscribe((status) => {
      this.status = status;
    });

    this._store.dispatch(loadVideos());
  }

  ngDoCheck(): void {
    this.status$.subscribe((status) => (this.status = status));
    this.error$.subscribe((err) => (this.error = err));
  }

  resetFormVideo = () => ({
    id: 0,
    name: '',
    command: '',
    desc: '',
    url: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  resetToAddModeAgain = (form: NgForm) => {
    this.videoIdEditing = 0;
    this.formVideo = this.resetFormVideo();

    this.isEditing = false;
    form.reset();
  };

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();

    if (!this.isEditing) {
      //creating new
      this._store.dispatch(createVideo({ payload: this.formVideo }));
    } else {
      //editing existing
      this._store.dispatch(
        editVideo({ id: this.videoIdEditing, payload: this.formVideo })
      );
    }

    this.resetToAddModeAgain(form);
  }

  receiveVideoFromChild(data: { id: number; video: Video }) {
    const { id, video } = data;

    this.videoIdEditing = id;
    this.formVideo = { ...video };

    this.isEditing = true;
  }
}
