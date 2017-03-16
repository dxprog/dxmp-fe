import { DataConnector } from './data-connector';
import { Album } from '../interfaces/album';

export class Albums extends DataConnector {
  private albums: Array<Album>;

  constructor() {
    super();
  }

  public async getAll(): Promise<Array<Album>> {
    const data = await this.getContent('album');
    this.albums = data.map(this.convertDxApiToAlbum);
    this.albums.forEach(album => {
      if (album.art) {
        album.artUrl = `http://dxmp.s3.amazonaws.com/images/${album.title.toLowerCase().replace(/[\s\W]+/gi, '-')}-album-art.jpg`;
      }
    });
    return this.albums;
  }

  public convertDxApiToAlbum(data: any): Album {
    const album: Album = {
      id: data.id,
      title: data.title,
      art: false,
      artUrl: null,
      wallpaper: false
    };
    return album;
  }
}