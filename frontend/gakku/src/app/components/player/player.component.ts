import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Song } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  @Input() song!: Song;
  @ViewChild('audio', { static: false }) audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('containerRef', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  isPlaying = false;
  progress = 0;
  currentTimeDisplay = '0:00';
  durationDisplay = '0:00';

  getAudioUrl(): string {
    return this.song.audio_file.startsWith('http')
      ? this.song.audio_file
      : `http://localhost:8000${this.song.audio_file}`;
  }

  togglePlay() {
    const audio = this.audioRef.nativeElement;
  
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
  
      // плавная прокрутка к плееру
      setTimeout(() => {
        this.containerRef.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 50); // ждём чуть-чуть, чтобы DOM точно отрисовался
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  onLoadedMetadata() {
    const audio = this.audioRef.nativeElement;
    if (!isNaN(audio.duration)) {
      this.durationDisplay = this.formatTime(audio.duration);
    }
  }

  onTimeUpdate() {
    const audio = this.audioRef.nativeElement;
    const current = audio.currentTime;
    const total = audio.duration;

    if (!isNaN(total) && total > 0) {
      this.progress = (current / total) * 100;
    }

    this.currentTimeDisplay = this.formatTime(current);
  }

  seek(event: MouseEvent) {
    const audio = this.audioRef?.nativeElement;
    if (!audio || isNaN(audio.duration) || audio.duration === 0) {
      console.warn('⛔ Duration is invalid, skipping seek.');
      return;
    }
    
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    
    
    const clampedPercentage = Math.max(0, Math.min(1, percentage));
    
    const newTime = clampedPercentage * audio.duration;
 
    audio.currentTime = newTime;
    
   
    this.progress = clampedPercentage * 100;
    this.currentTimeDisplay = this.formatTime(newTime);
    
   
    if (audio.paused) {
      audio.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(err => {
          console.error('Failed to play audio:', err);
        });
    }
  }

  onEnded() {
    this.isPlaying = false;
    this.progress = 0;
    this.currentTimeDisplay = '0:00';
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  }
}
