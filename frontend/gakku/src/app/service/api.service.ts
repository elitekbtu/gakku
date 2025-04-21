import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/login/`, credentials);
  }

  refresh(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/refresh/`, { refresh: refreshToken });
  }

  register(userData: { username: string; email?: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData);
  }

  getArtists(params?: { genres?: number[] }): Observable<any> {
    let httpParams = new HttpParams();
    if (params?.genres) {
      params.genres.forEach(genreId => {
        httpParams = httpParams.append('genres', genreId.toString());
      });
    }
    return this.http.get(`${this.apiUrl}artists/`, { 
      headers: this.getAuthHeaders(),
      params: httpParams
    });
  }

  getArtist(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}artists/${id}/`, { headers: this.getAuthHeaders() });
  }

  createArtist(artistData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}artists/`, artistData, { headers: this.getAuthHeaders() });
  }

  updateArtist(id: number, artistData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}artists/${id}/`, artistData, { headers: this.getAuthHeaders() });
  }

  deleteArtist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}artists/${id}/`, { headers: this.getAuthHeaders() });
  }

  getAlbums(params?: { artist_id?: number }): Observable<any> {
    let httpParams = new HttpParams();
    if (params?.artist_id) {
      httpParams = httpParams.append('artist_id', params.artist_id.toString());
    }
    return this.http.get(`${this.apiUrl}albums/`, { 
      headers: this.getAuthHeaders(),
      params: httpParams
    });
  }

  getAlbum(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}albums/${id}/`, { headers: this.getAuthHeaders() });
  }

  createAlbum(albumData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}albums/`, albumData, { headers: this.getAuthHeaders() });
  }

  updateAlbum(id: number, albumData: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}albums/${id}/`, albumData, { headers: this.getAuthHeaders() });
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}albums/${id}/`, { headers: this.getAuthHeaders() });
  }

  getSongs(params?: { album_id?: number, artist_id?: number, genre_id?: number }): Observable<any> {
    let httpParams = new HttpParams();
    if (params?.album_id) {
      httpParams = httpParams.append('album_id', params.album_id.toString());
    }
    if (params?.artist_id) {
      httpParams = httpParams.append('artist_id', params.artist_id.toString());
    }
    if (params?.genre_id) {
      httpParams = httpParams.append('genre_id', params.genre_id.toString());
    }
    return this.http.get(`${this.apiUrl}songs/`, { 
      headers: this.getAuthHeaders(),
      params: httpParams
    });
  }

  getSong(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}songs/${id}/`, { headers: this.getAuthHeaders() });
  }

  createSong(songData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}songs/`, songData, { headers: this.getAuthHeaders() });
  }

  updateSong(id: number, songData: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}songs/${id}/`, songData, { headers: this.getAuthHeaders() });
  }

  deleteSong(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}songs/${id}/`, { headers: this.getAuthHeaders() });
  }

  getVideos(): Observable<any> {
    return this.http.get(`${this.apiUrl}videos/`, { headers: this.getAuthHeaders() });
  }

  getVideo(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}videos/${id}/`, { headers: this.getAuthHeaders() });
  }

  createVideo(videoData: { url: string; song: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}videos/`, videoData, { headers: this.getAuthHeaders() });
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}videos/${id}/`, { headers: this.getAuthHeaders() });
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}genres/`, { headers: this.getAuthHeaders() });
  }

  createGenre(genreData: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}genres/`, genreData, { headers: this.getAuthHeaders() });
  }

  updateGenre(id: number, genreData: { name: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}genres/${id}/`, genreData, { headers: this.getAuthHeaders() });
  }

  deleteGenre(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}genres/${id}/`, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getMultipartAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}