import { Component, Input } from '@angular/core';
import { Video } from '../../models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
  @Input() video!: Video;
  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const videoId = this.video.url.split('v=')[1]?.split('&')[0];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
