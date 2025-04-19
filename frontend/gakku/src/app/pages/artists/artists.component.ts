// File: src/app/pages/artists/artists.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ArtistCardComponent } from '../../components/artist-card/artist-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, ArtistCardComponent],
  templateUrl: './artists.component.html'
})
export class ArtistsComponent implements OnInit {
  artists: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getArtists().subscribe(data => this.artists = data);
  }
}

