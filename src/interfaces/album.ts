export interface IAlbum {
  id: number;
  title: string;
  art: boolean;
  artUrl?: string;
  wallpaper: boolean;
}

export class Album implements IAlbum {
  id: number;
  title: string;
  art: boolean;
  artUrl?: string;
  wallpaper: boolean;

  constructor(albumObj: IAlbum) {
    Object.assign(this, albumObj);
  }

  get artThumbnail(): string {
    const artFileName = this.artUrl.split('/').pop();
    return `http://dxmp.us/thumb.php?file=${encodeURIComponent(artFileName)}&width=50&height=50`;
  }
}