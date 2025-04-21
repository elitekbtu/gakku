import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Song } from '../../models';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../../components/player/player.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, PlayerComponent,RouterModule],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: Song[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getSongs().subscribe({
      next: (songs) => {
        this.songs = songs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load songs', err);
        this.loading = false;
      }
    });
  }
}
