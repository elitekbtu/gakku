import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() isAuthenticated = false;
  @Output() logout = new EventEmitter<void>();

  menuItems = [
    { path: '/', name: 'Home', icon: 'home' },
    { path: '/artists', name: 'Artists', icon: 'people' },
    { path: '/albums', name: 'Albums', icon: 'album' },
    { path: '/songs', name: 'Songs', icon: 'music_note' },
    { path: '/videos', name: 'Videos', icon: 'video_library' }
  ];
}