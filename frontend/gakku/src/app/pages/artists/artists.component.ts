import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ArtistCardComponent } from '../../components/artist-card/artist-card.component';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, ArtistCardComponent],
  templateUrl: './artists.component.html',
})
export class ArtistsComponent implements OnInit {
  artists: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getArtists().subscribe((data) => {
      this.artists = data;
    });
  }
}
