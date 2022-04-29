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
    MediaCardComponent
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
