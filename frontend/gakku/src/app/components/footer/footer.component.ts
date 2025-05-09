import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  links = [
    { path: '/artists', name: 'Artists' },
    { path: '/albums', name: 'Albums' },
    { path: '/songs', name: 'Songs' },
    { path: '/videos', name: 'Videos' }
  ];

  socialLinks = [
    { iconClass: 'fab fa-facebook', url: '#', name: 'Facebook' }, 
    { iconClass: 'fab fa-twitter', url: '#', name: 'Twitter' }, 
    { iconClass: 'fab fa-youtube', url: '#', name: 'YouTube' },
    { iconClass: 'fab fa-instagram', url: '#', name: 'Instagram' }
  ];
}