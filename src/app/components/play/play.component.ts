import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit {
  public videoId: string = '';
  public videoUrl: SafeResourceUrl = '';

  constructor(private _route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this._route.params.subscribe((params) => {
      const { video_id: id } = params;
      this.videoId = id;
    });
  }

  ngOnInit(): void {
    if (this.videoId) {
      let url = 'https://www.youtube.com/embed/' + this.videoId;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
