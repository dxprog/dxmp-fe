export interface ISong {
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

export class Song implements ISong {
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

  constructor(songObj: ISong) {
    Object.assign(this, songObj);
  }

  /**
   * Returns the audio file URL for this song
   * @return {string} The URL to the audio file
   */
  get url(): string {
    return `http://dxmp.s3.amazonaws.com/songs/${this.filename}`;
  }
}