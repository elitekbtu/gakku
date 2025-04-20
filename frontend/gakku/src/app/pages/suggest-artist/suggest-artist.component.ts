import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-suggest-artist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './suggest-artist.component.html'
})
export class SuggestArtistComponent implements OnInit {
  form: FormGroup;
  genres: any[] = []; // ✅ добавляем genres

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      name: [''],
      bio: [''],
      debut_year: [''],
      photo: [null],
      genres: [[]]
    });
  }

  ngOnInit(): void {
    this.api.getGenres().subscribe({
      next: (data) => (this.genres = data),
      error: () => alert('Ошибка загрузки жанров')
    });
  }

  onSubmit() {
    const formData = new FormData();
    const value = this.form.value;

    for (const key in value) {
      if (key === 'genres' && Array.isArray(value.genres)) {
        value.genres.forEach((genreId: string) => formData.append('genres', genreId));
      } else if (key === 'photo') {
        if (value.photo) {
          formData.append('photo', value.photo);
        }
      } else if (value[key] !== null && value[key] !== undefined) {
        formData.append(key, String(value[key]));
      }
    }

    this.api.createArtist(formData).subscribe({
      next: () => this.router.navigate(['/artists']),
      error: (err: Error) => alert('Ошибка при отправке: ' + err.message)
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.form.patchValue({ photo: file });
  }
}
