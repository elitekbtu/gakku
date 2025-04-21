import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ArtistDetailsComponent } from './pages/artist-detail/artist-detail.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { AlbumDetailComponent } from './pages/album-detail/album-detail.component';
import { SongsComponent } from './pages/songs/songs.component';
import { VideosComponent } from './pages/videos/videos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'artists', component: ArtistsComponent }, 
  { path: 'artists/:id', component: ArtistDetailsComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'albums/:id', component: AlbumDetailComponent },
  { path: 'songs', component:SongsComponent},
  { path: 'videos', component:VideosComponent}
];
