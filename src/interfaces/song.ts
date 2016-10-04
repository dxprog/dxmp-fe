export interface Song {
  id: number;
  title: string;
  albumId: number;
  artistId?: number;
  filename: string;
  duration?: number;
  track?: number;
  disc?: number;
  year?: number;
  created: number;
  addedBy: number;
}