import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio = new Audio();
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentSongSubject = new BehaviorSubject<any>(null);
  private progressSubject = new BehaviorSubject<number>(0);
  private volumeSubject = new BehaviorSubject<number>(0.7);
  private durationSubject = new BehaviorSubject<number>(0);
  
  isPlaying$ = this.isPlayingSubject.asObservable();
  currentSong$ = this.currentSongSubject.asObservable();
  progress$ = this.progressSubject.asObservable();
  volume$ = this.volumeSubject.asObservable();
  duration$ = this.durationSubject.asObservable();

  private playlist: any[] = [];
  private currentIndex = 0;

  constructor() {
    this.setupAudioListeners();
    this.audio.volume = 0.7;
  }

  private setupAudioListeners(): void {
    this.audio.addEventListener('timeupdate', () => {
      this.progressSubject.next(this.audio.currentTime);
    });

    this.audio.addEventListener('durationchange', () => {
      this.durationSubject.next(this.audio.duration);
    });

    this.audio.addEventListener('ended', () => {
      this.next();
    });

    this.audio.addEventListener('play', () => {
      this.isPlayingSubject.next(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlayingSubject.next(false);
    });
  }

  load(song: any): void {
    this.currentSongSubject.next(song);
    this.audio.src = song.audio_file;
    this.audio.load();
    this.play();
  }

  play(): void {
    this.audio.play().catch(error => {
      console.error('Playback failed:', error);
    });
  }

  pause(): void {
    this.audio.pause();
  }

  togglePlay(): void {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  seekTo(time: number): void {
    this.audio.currentTime = time;
  }

  setVolume(volume: number): void {
    this.audio.volume = volume;
    this.volumeSubject.next(volume);
  }

  setPlaylist(playlist: any[], startIndex: number = 0): void {
    this.playlist = playlist;
    this.currentIndex = startIndex;
    this.load(this.playlist[this.currentIndex]);
  }

  next(): void {
    if (this.playlist.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
      this.load(this.playlist[this.currentIndex]);
    }
  }

  previous(): void {
    if (this.playlist.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
      this.load(this.playlist[this.currentIndex]);
    }
  }
}