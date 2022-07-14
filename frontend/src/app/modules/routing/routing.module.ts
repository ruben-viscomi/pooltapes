import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component';
import { AdminComponent } from '../../components/login/admin/admin.component';

import { UserClientComponent } from '../../components/user-client/user-client.component';
import { HomeComponent } from '../../components/user-client/home/home.component';
import { MoviesComponent } from '../../components/user-client/movies/movies.component';
import { SeriesComponent } from '../../components/user-client/series/series.component';
import { FavoritesComponent } from '../../components/user-client/favorites/favorites.component';
import { MovieDetailComponent } from '../../components/movie-detail/movie-detail.component';
import { SeriesDetailComponent } from '../../components/series-detail/series-detail.component';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';

import { ContentAdminClientComponent } from '../../components/content-admin-client/content-admin-client.component';

import { IsAuthUserGuard } from '../../guards/is-auth-user.guard';
import { IsAuthAdminGuard } from '../../guards/is-auth-admin.guard';

import { Roles } from '../../models/roles.enum';

const routes: Routes = [
  { path: '', component: UserClientComponent, canActivate: [IsAuthUserGuard], children: [
    { path: '', component: HomeComponent },
    { path: 'movies', children: [
      { path: '', component: MoviesComponent },
      { path: ':id', component: MovieDetailComponent }
    ] },
    { path: 'series', children: [
      { path: '', component: SeriesComponent },
      { path: ':id', component: SeriesDetailComponent }
    ] },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'video/:id', component: VideoPlayerComponent }
  ] },
  { path: 'login', children: [
    { path: '', component: LoginComponent },
    { path: 'admin', component: AdminComponent }
  ] },
  { path: 'admin', canActivate: [IsAuthAdminGuard], children: [
    { path: 'content', component: ContentAdminClientComponent, canActivate: [IsAuthAdminGuard], data: { role: Roles.CONTENT } }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
