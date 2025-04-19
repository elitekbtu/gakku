import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AlbumCardComponent } from '../../components/album-card/album-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent],
  templateUrl: './albums.component.html'
})
export class AlbumsComponent implements OnInit {
  albums: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getAlbums().subscribe(data => this.albums = data);
  }
}

