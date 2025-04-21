import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Video } from '../../models';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../../components/video-card/video-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, VideoCardComponent,RouterModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos: Video[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getVideos().subscribe({
      next: (data) => {
        this.videos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load videos:', err);
        this.loading = false;
      }
    });
    console.log('Videos:', this.videos);
  }
  
}
