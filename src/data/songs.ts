import { DataConnector } from './data-connector';
import { Song } from '../interfaces/song';

export class Songs extends DataConnector {
  private songs: Array<Song>;

  constructor() {
    super();
  }

  public async getAll(): Promise<Array<Song>> {
    const data = await this.getContent('song');
    this.songs = data.map(this.convertDxApiToSong);
    return this.songs;
  }

  private convertDxApiToSong(data: any): Song {
    const song: Song = {
      id: data.id,
      title: data.title,
      album_id: data.parent,
      filename: data.meta.filename,
      track: data.meta.track || 1,
      duration: data.meta.duration,
      created: data.date,
      added_by: 0
    };
    return song;
  }
}