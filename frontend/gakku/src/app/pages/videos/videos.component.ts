import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { VideoCardComponent } from '../../components/video-card/video-card.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, VideoCardComponent,FormsModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos: any[] = [];
  filteredVideos: any[] = [];
  loading = true;
  error: string | null = null;
  searchQuery = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.loading = true;
    this.error = null;
    this.apiService.getVideos().subscribe({
      next: (response: any) => {
        this.videos = Array.isArray(response) ? response : response?.results || [];
        this.videos = this.videos.map(video => ({
          ...video,
          song: typeof video.song === 'object' ? video.song : { id: video.song }
        }));
        this.filteredVideos = [...this.videos];
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