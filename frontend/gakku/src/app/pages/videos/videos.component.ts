import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { VideoCardComponent } from '../../components/video-card/video-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, VideoCardComponent],
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {
  videos: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getVideos().subscribe(data => this.videos = data);
  }
}

