import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  artist: any;
  isLoading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getArtistById(+id).subscribe({
        next: (data) => {
          this.artist = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Ошибка при загрузке артиста';
          this.isLoading = false;
        }
      });
    }
  }
}
