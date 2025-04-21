import { Component, inject } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  playerService = inject(PlayerService);
  
  currentSong$ = this.playerService.currentSong$;
  isPlaying$ = this.playerService.isPlaying$;
  progress$ = this.playerService.progress$;
  duration$ = this.playerService.duration$;
  volume$ = this.playerService.volume$;

  isMuted = false;
  previousVolume = 0.7;

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  seekTo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const seekTime = (Number(target.value) / 100) * (this.playerService['durationSubject'].value || 0);
    this.playerService.seekTo(seekTime);
  }

  setVolume(event: Event): void {
    const target = event.target as HTMLInputElement;
    const volume = Number(target.value) / 100;
    this.playerService.setVolume(volume);
  }

  toggleMute(): void {
    if (this.isMuted) {
      this.playerService.setVolume(this.previousVolume);
    } else {
      this.previousVolume = this.playerService['volumeSubject'].value;
      this.playerService.setVolume(0);
    }
    this.isMuted = !this.isMuted;
  }
}