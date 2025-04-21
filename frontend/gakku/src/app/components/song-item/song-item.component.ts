import { Component, Input } from '@angular/core';
import { Song } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-item.component.html' ,
  styles: []
})
export class SongItemComponent {
  @Input() song!: Song;
  @Input() index!: number;
  
  get formattedDuration(): string {
    if (!this.song || typeof this.song.duration !== 'number' || this.song.duration < 0) {
      return '--:--'; 
    }

    const totalSeconds = Math.floor(this.song.duration); 
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${minutes}:${formattedSeconds}`;
  }
}