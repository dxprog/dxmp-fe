export interface Song {
  id: number;
  title: string;
  album_id: number;
  artist_id?: number;
  filename: string;
  duration?: number;
  track?: number;
  disc?: number;
  year?: number;
  created: number;
  added_by: number;
}