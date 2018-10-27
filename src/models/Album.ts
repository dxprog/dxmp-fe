import { createPerma, IAlbum } from 'dxmp-common';

const ART_LOCATION = 'http://api.dxmp.us/images/art/';

export function getAlbumArtUrl(album: IAlbum): string {
  return `${ART_LOCATION}${createPerma(album.id.toString(36))}.jpg`;
}