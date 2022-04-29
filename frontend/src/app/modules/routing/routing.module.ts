import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component';
import { AdminComponent } from '../../components/login/admin/admin.component';

import { UserClientComponent } from '../../components/user-client/user-client.component';
import { HomeComponent } from '../../components/user-client/home/home.component';
import { MoviesComponent } from '../../components/user-client/movies/movies.component';
import { SeriesComponent } from '../../components/user-client/series/series.component';
import { FavoritesComponent } from '../../components/user-client/favorites/favorites.component';

import { IsAuthUserGuard } from '../../guards/is-auth-user.guard';

const routes: Routes = [
  { path: '', component: UserClientComponent, canActivate: [IsAuthUserGuard], children: [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'series', component: SeriesComponent },
    { path: 'favorites', component: FavoritesComponent }
  ] },
  { path: 'login', children: [
    { path: '', component: LoginComponent },
    { path: 'admin', component: AdminComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }