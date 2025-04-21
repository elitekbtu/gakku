import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Input() isLogin: boolean = true;
  @Output() onSubmit = new EventEmitter<any>();

  credentials = {
    username: '',
    email: '',
    password: ''
  };

  submit() {
    if (this.isLogin) {
      const { username, password } = this.credentials;
      this.onSubmit.emit({ username, password });
    } else {
      this.onSubmit.emit(this.credentials);
    }
  }
}