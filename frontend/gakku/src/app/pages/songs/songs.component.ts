import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { PlayerService } from '../../service/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: any[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.isLoading = true;
    this.apiService.getSongs().subscribe({
      next: (response) => {
        this.songs = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading songs:', error);
        this.isLoading = false;
      }
    });
  }

  playSong(song: any, index: number): void {
    this.playerService.setPlaylist(this.songs, index);
  }
}