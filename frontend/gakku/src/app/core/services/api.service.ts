// src/app/core/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  // 🔐 Аутентификация
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/login/`, credentials);
  }

  refresh(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/refresh/`, { refresh: refreshToken });
  }

  register(userData: { username: string; email?: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/register/`, userData);
  }

  // 🎤 Артисты
  getArtists(): Observable<any> {
    return this.http.get(`${this.apiUrl}artists/`, { headers: this.getAuthHeaders() });
  }

  createArtist(artistData: { name: string; debut_year: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}artists/`, artistData, { headers: this.getAuthHeaders() });
  }

  // 💿 Альбомы
  getAlbums(): Observable<any> {
    return this.http.get(`${this.apiUrl}albums/`, { headers: this.getAuthHeaders() });
  }

  getAlbum(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}albums/${id}/`, { headers: this.getAuthHeaders() });
  }

  createAlbum(albumData: { title: string; released_at: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}albums/`, albumData, { headers: this.getAuthHeaders() });
  }

  updateAlbum(id: number, albumData: Partial<{ title: string; released_at: string }>): Observable<any> {
    return this.http.put(`${this.apiUrl}albums/${id}/`, albumData, { headers: this.getAuthHeaders() });
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}albums/${id}/`, { headers: this.getAuthHeaders() });
  }

  // 🎵 Песни
  getSongs(): Observable<any> {
    return this.http.get(`${this.apiUrl}songs/`, { headers: this.getAuthHeaders() });
  }

  getSong(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}songs/${id}/`, { headers: this.getAuthHeaders() });
  }

  createSong(songData: { title: string; duration: number; album: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}songs/`, songData, { headers: this.getAuthHeaders() });
  }

  updateSong(id: number, songData: Partial<{ title: string; duration: number; album: number }>): Observable<any> {
    return this.http.put(`${this.apiUrl}songs/${id}/`, songData, { headers: this.getAuthHeaders() });
  }

  deleteSong(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}songs/${id}/`, { headers: this.getAuthHeaders() });
  }

  // 📹 Видео
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

  // 🔧 Хелпер для заголовков авторизации
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
