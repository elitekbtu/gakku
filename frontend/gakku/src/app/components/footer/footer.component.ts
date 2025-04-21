import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  links = [
    { path: '/about', name: 'About' },
    { path: '/terms', name: 'Terms' },
    { path: '/privacy', name: 'Privacy' },
    { path: '/contact', name: 'Contact' }
  ];

  socialLinks = [
    { icon: 'Facebook', url: '#' },
    { icon: 'Twitter', url: '#' },
    { icon: 'Instagram', url: '#' },
    { icon: 'YouTube', url: '#' }
  ];
}