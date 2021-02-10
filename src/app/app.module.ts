import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { videoReducer } from './redux/reducer';
import { VideoEffects } from './redux/videos.effects';
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, VideoComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ videoState: videoReducer }, {}),

    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([VideoEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
