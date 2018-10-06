import { createPerma, IAlbum } from 'dxmp-common';

const ART_LOCATION = 'http://dxmp.s3.amazonaws.com/images/';

export function getAlbumArtUrl(album: IAlbum): string {
  return `${ART_LOCATION}${createPerma(album.title.trim().replace('\u0000', ''))}-album-art.jpg`;
}