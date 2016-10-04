import { DataConnector } from './data-connector';
import { Song } from '../interfaces/song';

export class Songs extends DataConnector {
  private songs: Array<Song>;

  constructor() {
    super();
  }

  public async getAll() {
    const data = await this.get('/songs');
  }
}