import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  isPlaying = false;
  currentSong = {
    title: 'Song Title',
    artist: 'Artist Name',
    duration: '3:45',
    progress: 30
  };

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }
}