import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RoutingModule } from './modules/routing/routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/login/admin/admin.component';
import { UserClientComponent } from './components/user-client/user-client.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { HomeComponent } from './components/user-client/home/home.component';
import { MoviesComponent } from './components/user-client/movies/movies.component';
import { SeriesComponent } from './components/user-client/series/series.component';
import { FavoritesComponent } from './components/user-client/favorites/favorites.component';
import { CategoryComponent } from './components/category/category.component';
import { MediaCardComponent } from './components/media-card/media-card.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

import { StringListPipe } from './pipes/string-list.pipe';
import { SeriesDetailComponent } from './components/series-detail/series-detail.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { PinnedComponent } from './components/pinned/pinned.component';
import { MiniDetailComponent } from './components/pinned/mini-detail/mini-detail.component';
import { PlayerBarComponent } from './components/video-player/player-bar/player-bar.component';
import { FullscreenableDirective } from './directives/fullscreenable.directive';
import { PlayableDirective } from './directives/playable.directive';
import { HideableBarDirective } from './directives/hideable-bar.directive';
import { PlayerSliderDirective } from './directives/player-slider.directive';
import { MediaTimePipe } from './pipes/media-time.pipe';
import { ToggleableMenuDirective } from './directives/toggleable-menu.directive';
import { PlayButtonComponent } from './components/video-player/player-bar/play-button/play-button.component';
import { FullscreenButtonComponent } from './components/video-player/player-bar/fullscreen-button/fullscreen-button.component';
import { VolumeSliderComponent } from './components/video-player/player-bar/volume-slider/volume-slider.component';
import { ProgressSkipComponent } from './components/video-player/player-bar/progress-skip/progress-skip.component';
import { TrackSelectorComponent } from './components/video-player/player-bar/track-selector/track-selector.component';
import { ContentAdminClientComponent } from './components/content-admin-client/content-admin-client.component';
import { AdminCategoriesComponent } from './components/content-admin-client/admin-categories/admin-categories.component';
import { AdminMoviesComponent } from './components/content-admin-client/admin-movies/admin-movies.component';
import { AdminSeriesComponent } from './components/content-admin-client/admin-series/admin-series.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserClientComponent,
    HeaderBarComponent,
    HomeComponent,
    MoviesComponent,
    SeriesComponent,
    FavoritesComponent,
    CategoryComponent,
    MediaCardComponent,
    MovieDetailComponent,
    StringListPipe,
    SeriesDetailComponent,
    VideoPlayerComponent,
    PinnedComponent,
    MiniDetailComponent,
    PlayerBarComponent,
    FullscreenableDirective,
    PlayableDirective,
    HideableBarDirective,
    PlayerSliderDirective,
    MediaTimePipe,
    ToggleableMenuDirective,
    PlayButtonComponent,
    FullscreenButtonComponent,
    VolumeSliderComponent,
    ProgressSkipComponent,
    TrackSelectorComponent,
    ContentAdminClientComponent,
    AdminCategoriesComponent,
    AdminMoviesComponent,
    AdminSeriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
