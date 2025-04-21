import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Album } from '../../models';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from '../../components/album-card/album-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent,RouterModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading albums:', err);
        this.loading = false;
      }
    });
  }
}
