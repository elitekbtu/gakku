import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Album, Song } from '../../models';
import { CommonModule } from '@angular/common';
import { SongItemComponent } from '../../components/song-item/song-item.component';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, SongItemComponent,RouterModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album?: Album;
  songs: Song[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));
    if (albumId) {
      this.api.getAlbum(albumId).subscribe(album => {
        this.album = album;
      });

      this.api.getSongs({ album_id: albumId }).subscribe(songs => {
        this.songs = songs;
        this.loading = false;
      });
    }
  }
  isArtistObject(artist: any): artist is { name: string } {
    return artist && typeof artist === 'object' && 'name' in artist;
  }

  getCoverUrl(): string {
    if (!this.album?.cover) return '';
    return this.album.cover.startsWith('http')
      ? this.album.cover
      : `http://localhost:8000${this.album.cover}`;
  }
}
