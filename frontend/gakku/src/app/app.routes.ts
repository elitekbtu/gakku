import { Routes } from '@angular/router';

// Классические (если НЕ standalone)
import { HomeComponent } from './pages/home/home.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { SongsComponent } from './pages/songs/songs.component';
import { VideosComponent } from './pages/videos/videos.component';
import { SuggestArtistComponent } from './pages/suggest-artist/suggest-artist.component';

// Если они тоже standalone — надо будет заменить на loadComponent (как ниже для Login и Register)

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'videos', component: VideosComponent },

  // ✅ Standalone компоненты подключаются через loadComponent:
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent)
  }, 
  
  {
    path: 'artist/:id',
    loadComponent: () => import('./pages/artist-detail.component').then(m => m.ArtistDetailComponent)
  },  
  {
    path: 'suggest-artist',
    loadComponent: () =>
      import('./pages/suggest-artist/suggest-artist.component').then(m => m.SuggestArtistComponent)
  },
  
  // fallback
  { path: '**', redirectTo: '/register' },



  
];
