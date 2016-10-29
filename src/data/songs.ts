import { DataConnector } from './data-connector';
import { Song } from '../interfaces/song';

export class Songs extends DataConnector {
  private songs: Array<Song>;

  constructor() {
    super();
  }

  public async getAll(): Promise<Array<Song>> {
    const data = await this.get('/songs');
    this.songs = data as Array<Song>;
    return this.songs;
  }
}