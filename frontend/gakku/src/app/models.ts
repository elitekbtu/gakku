export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Artist {
    id: number;
    user?: number; 
    name: string;
    bio?: string;
    debut_year: number;
    photo?: string; 
    genres?: Genre[];
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Album {
    id: number;
    title: string;
    released_at: string; 
    artist: Artist; 
    cover?: string; 
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Song {
    id: number;
    title: string;
    duration: number; 
    album?: Album | number; 
    artist: Artist | number; 
    genres?: Genre[];
    audio_file: string; 
    is_published?: boolean;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Video {
    id: number;
    song: number | Song; 
    url: string;
    uploaded_by: number | User; 
    uploaded_at?: string;
  }
  
  export interface User {
    id: number;
  }