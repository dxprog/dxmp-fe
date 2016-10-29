import { DataConnector } from './data-connector';
import { Album } from '../interfaces/album';

export class Albums extends DataConnector {
  private albums: Array<Album>;

  constructor() {
    super();
  }

  public async getAll(): Promise<Array<Album>> {
    this.albums = await this.get('/albums') as Array<Album>;
    this.albums.forEach(album => {
      if (album.art) {
        album.artUrl = `http://dxmp.s3.amazonaws.com/images/${album.title.toLowerCase().replace(/[\s\W]+/gi, '-')}-album-art.jpg`;
      }
    });
    return this.albums;
  }
}