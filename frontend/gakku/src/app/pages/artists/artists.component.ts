import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ArtistCardComponent } from '../../components/artist-card/artist-card.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
  animations: [
    trigger('staggerFade', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger(75, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ArtistsComponent implements OnInit {
  artists: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadArtists();
  }
  
  loadArtists(): void {
    this.isLoading = true;
    this.error = null;
    
    this.api.getArtists().subscribe({
      next: (data) => {
        this.artists = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки артистов:', err);
        this.error = 'Не удалось загрузить данные. Пожалуйста, попробуйте позже.';
        this.isLoading = false;
      }
    });
  }
  
  // Дополнительные методы
  filterByCategory(category: string): void {
    // Реализация фильтрации
    console.log('Фильтрация по категории:', category);
  }
  
  sortArtists(criteria: string): void {
    // Реализация сортировки
    console.log('Сортировка по:', criteria);
  }

  selectedArtist: any = null;

openDetails(artist: any): void {
  this.selectedArtist = artist;
}

closeDetails(): void {
  this.selectedArtist = null;
}
}
