import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  artists: any[] = [];
  videos: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadArtists();
    this.loadVideos();
  }

  loadArtists(): void {
    this.api.getArtists().subscribe({
      next: (data) => this.artists = data.slice(-4).reverse(), // последние 4 артиста
      error: (err) => console.error('Ошибка загрузки артистов', err)
    });
  }

  loadVideos(): void {
    this.api.getVideos().subscribe({
      next: (data) => this.videos = data.slice(-4).reverse(), // последние 4 видео
      error: (err) => console.error('Ошибка загрузки видео', err)
    });
  }
}
