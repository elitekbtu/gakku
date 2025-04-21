import { Component, Input } from '@angular/core';
import { Video, Song, Artist } from '../../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div class="relative pb-[56.25%]"> <!-- 16:9 aspect ratio -->
        <iframe 
          *ngIf="safeUrl; else thumbnail"
          class="absolute top-0 left-0 w-full h-full"
          [src]="safeUrl" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
        
        <ng-template #thumbnail>
          <div class="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: []
})
export class VideoCardComponent {
  @Input() video!: Video;
  @Input() showDetails: boolean = true;
  safeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.video?.url) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.getSafeUrl(this.video.url)
      );
    }
  }

  getSafeUrl(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = this.extractYouTubeId(url);
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1].split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=0`;
    }
    return url;
  }

  private extractYouTubeId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  getSongTitle(): string {
    if (typeof this.video.song === 'object') {
      return this.video.song.title || 'Untitled Video';
    }
    return 'Untitled Video';
  }

  getArtistName(): string {
    if (typeof this.video.song === 'object' && this.video.song.artist) {
      if (typeof this.video.song.artist === 'object') {
        return this.video.song.artist.name;
      }
    }
    return 'Unknown Artist';
  }

  getSongLink(): any[] {
    if (typeof this.video.song === 'object') {
      return ['/songs', this.video.song.id];
    }
    return ['/'];
  }
}