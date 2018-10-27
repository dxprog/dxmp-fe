import { IAlbum, ISong } from 'dxmp-common';
import * as React from 'react';

import * as Album from '../models/Album';

import './SongResult.scss';

interface ISongResultProps {
  album: IAlbum,
  song: ISong,
  query: string,
};

export class SongResult extends React.PureComponent<ISongResultProps> {
  public render(): React.ReactNode {
    const { album, query, song } = this.props;
    const queryPos = song.title.search(new RegExp(query, 'i'));
    const prefix = song.title.substr(0, queryPos);
    const match = song.title.substr(queryPos, query.length);
    const suffix = song.title.substr(queryPos + query.length);
    return (
      <div className="song-result" key={song.id}>
        <img src={Album.getAlbumArtUrl(album)} />
        <div className="song-info">
          <div className="song-title">
            {prefix}<span className="highlight">{match}</span>{suffix}  
          </div>
          <div className="song-album-title">
            {album.title}
          </div>
        </div>
      </div>
    );
  }
}