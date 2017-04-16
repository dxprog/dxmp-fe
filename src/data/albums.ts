import { DataConnector } from './data-connector';
import { Album } from '../interfaces/album';

export class Albums extends DataConnector {
  private albums: Array<Album>;

  constructor() {
    super();
  }

  public async getAll(): Promise<Array<Album>> {
    const data = await this.getContent('album', { max: '0' });
    this.albums = data.filter((album: any) => !!album.title).map(this.convertDxApiToAlbum);
    this.albums.forEach(album => {
      if (album.art) {
        album.artUrl = `http://dxmp.s3.amazonaws.com/images/${album.artUrl}`;
      }
    });
    return this.albums;
  }

  public convertDxApiToAlbum(data: any): Album {
    const { meta } = data;
    const { art = '' } = meta || {};
    const album: Album = new Album({
      id: data.id,
      title: data.title,
      art: !!art,
      artUrl: art,
      wallpaper: false
    });
    return album;
  }
}