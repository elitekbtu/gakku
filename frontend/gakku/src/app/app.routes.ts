import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
// import { ArtistsComponent } from './pages/artists/artists.component';
// import { AlbumsComponent } from './pages/albums/albums.component';
// import { SongsComponent } from './pages/songs/songs.component';
// import { VideosComponent } from './pages/videos/videos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'artists', component: ArtistsComponent },
//   { path: 'albums', component: AlbumsComponent },
//   { path: 'songs', component: SongsComponent },
//   { path: 'videos', component: VideosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/home' }
];