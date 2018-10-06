import { IAlbum } from 'dxmp-common';
import * as React from 'react';

import { getAlbumArtUrl } from '../models/Album';
import './AlbumArt.scss';

export interface IAlbumArt {
  album: IAlbum
}

export class AlbumArt extends React.Component<IAlbumArt> {
  public render(): React.ReactNode {
    const albumArtUrl = getAlbumArtUrl(this.props.album);
    return (
      <div className="album-art">
        <img
          src={albumArtUrl}
          className="album-art__image album-art__image--glow"
        />

        <img
          src={albumArtUrl}
          className="album-art__image album-art__image--shadow"
        />
      </div>
    );
  }
}