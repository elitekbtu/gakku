import { Component, Input } from '@angular/core';
import { Album } from '../../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'./album-card.component.html' ,
  styles: []
})
export class AlbumCardComponent {
  @Input() album!: Album;

  getCoverUrl(cover: string): string {
    return cover.startsWith('http') ? cover : `http://localhost:8000${cover}`;
  }
}