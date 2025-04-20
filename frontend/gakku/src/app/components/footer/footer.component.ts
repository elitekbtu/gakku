import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  showScrollButton = false;
  email: string = '';

  // Links for navigation and social media
  navigationLinks = [
    { title: 'Home', route: '/' },
    { title: 'About Us', route: '/about' },
    { title: 'Music', route: '/music' },
    { title: 'Events', route: '/events' },
    { title: 'News', route: '/news' },
    { title: 'Contact', route: '/contact' },
  ];

  socialLinks = [
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com/gakku' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com/gakku' },
    { name: 'Telegram', icon: 'fab fa-telegram', url: 'https://t.me/gakku' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com/gakku' },
    { name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://tiktok.com/@gakku' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
}