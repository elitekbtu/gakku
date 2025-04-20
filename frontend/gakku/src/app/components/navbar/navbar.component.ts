
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;

  // Navigation links array for easier management
  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/artists', label: 'Artists' },
    { path: '/albums', label: 'Albums' },
    { path: '/songs', label: 'Songs' },
    { path: '/videos', label: 'Videos' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    // Add shadow and slight background when scrolled
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}