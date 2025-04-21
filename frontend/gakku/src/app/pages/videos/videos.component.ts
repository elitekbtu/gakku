import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { VideoCardComponent } from '../../components/video-card/video-card.component';
import { Video } from '../../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, VideoCardComponent, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Music Videos</h1>
      </div>

      <div *ngIf="loading" class="text-center py-12">
         <p class="text-gray-600 dark:text-gray-300">Загрузка видео...</p>
      </div>

      <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error && videos.length === 0" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-300">Пока нет доступных видео.</p>
        <a
          routerLink="/videos/upload"
          class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Загрузить первое видео
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <app-video-card
          *ngFor="let video of videos"
          [video]="video"
        ></app-video-card>
      </div>
    </div>
  `,
  styles: []
})
export class VideosComponent implements OnInit {
  private apiService = inject(ApiService);

  videos: Video[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.loading = true;
    this.error = null;
    this.apiService.getVideos().subscribe({
      next: (response: any) => {
        this.videos = Array.isArray(response) ? response : response?.results || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading videos:', error);
        this.error = 'Не удалось загрузить видео. Пожалуйста, попробуйте позже.';
        this.loading = false;
      }
    });
  }
}