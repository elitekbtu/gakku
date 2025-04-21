import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

interface Song {
  title: string;
  artist?: {
    name: string;
  };
  album?: {
    cover?: string;
    title?: string;
  };
  audio_file: string;
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  player = inject(PlayerService);
  
  currentSong = this.player.currentSong$;
  isPlaying = this.player.isPlaying$;
  progress = this.player.progress$;
  duration = this.player.duration$;
  volume = this.player.volume$;

  isMuted = false;
  currentVolume = 0.7;
  private volumeSub!: Subscription;

  ngOnInit(): void {
    this.volumeSub = this.volume.subscribe(vol => {
      this.currentVolume = vol;
    });
  }

  ngOnDestroy(): void {
    this.volumeSub.unsubscribe();
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  seek(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.duration.subscribe(duration => {
      const seekTime = (Number(target.value) / 100) * (duration || 0);
      this.player.seekTo(seekTime);
    });
  }

  changeVolume(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newVolume = Number(target.value) / 100;
    this.player.setVolume(newVolume);
    this.currentVolume = newVolume;
    this.isMuted = newVolume === 0;
  }

  toggleMute(): void {
    if (this.isMuted) {
      // Unmute - restore previous volume
      this.player.setVolume(this.currentVolume > 0 ? this.currentVolume : 0.7);
      this.isMuted = false;
    } else {
      // Mute - store current volume and set to 0
      this.player.setVolume(0);
      this.isMuted = true;
    }
  }
}