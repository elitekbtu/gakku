import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  artists: any[] = [];
  videos: any[] = [];

  currentTitle: string = 'ОТКРОЙТЕ ДЛЯ СЕБЯ СИЛУ КАЗАХСКОЙ МУЗЫКИ';
  randomFact: string = '';

  private titles: string[] = [
    'ОТКРОЙТЕ ДЛЯ СЕБЯ СИЛУ КАЗАХСКОЙ МУЗЫКИ',
    'ПОГРУЗИТЕСЬ В РИТМ НАСТОЯЩЕЙ КУЛЬТУРЫ',
    'СЛУШАЙТЕ ТО, ЧТО БЛИЗКО СЕРДЦУ',
    'МУЗЫКА, КОТОРАЯ ОБЪЕДИНЯЕТ ПОКОЛЕНИЯ'
  ];

  private facts: string[] = [
    'Gakku был основан как платформа поддержки казахстанских артистов.',
    'Название Gakku означает "песня, летящая по ветру".',
    'Многие известные исполнители начали с Gakku.',
    'Цель платформы — сохранить музыкальное наследие Казахстана.'
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadArtists();
    this.loadVideos();
    this.rotateTitle();
    this.pickRandomFact();
  }

  loadArtists(): void {
    this.api.getArtists().subscribe({
      next: (data) => this.artists = data.slice(-4).reverse(),
      error: (err) => console.error('Ошибка загрузки артистов', err)
    });
  }

  loadVideos(): void {
    this.api.getVideos().subscribe({
      next: (data) => this.videos = data.slice(-4).reverse(),
      error: (err) => console.error('Ошибка загрузки видео', err)
    });
  }

  rotateTitle(): void {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % this.titles.length;
      this.currentTitle = this.titles[index];
    }, 5000); // каждые 5 секунд
  }

  pickRandomFact(): void {
    const i = Math.floor(Math.random() * this.facts.length);
    this.randomFact = this.facts[i];
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
