import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, SongCardComponent],
  templateUrl: './songs.component.html'
})
export class SongsComponent implements OnInit {
  songs: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getSongs().subscribe(data => this.songs = data);
  }
}

