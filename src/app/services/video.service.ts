import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  loadAllVideos(): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(this.API_URL + '/api/v1/apm');
  }
}
