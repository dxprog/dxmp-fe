import { DataConnector } from './data-connector';
import { Album } from '../interfaces/album';

export class Albums extends DataConnector {
  private albums: Array<Album>;

  constructor() {
    super();
  }

  public async getAll(): Promise<Array<Album>> {
    const data = await this.get('/albums');
    this.albums = data as Array<Album>;
    return this.albums;
  }
}