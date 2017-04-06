import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumListItem } from './AlbumListItem';

export interface Props {
  albums: Array<Album>;
  songs: Array<Song>;
}

export class Page extends React.Component<Props, undefined> {
  props: Props;

  render() {
    return (
      <ul id="page">
        {this.props.albums.map(album => <AlbumListItem album={album} songs={this.props.songs} />)}
      </ul>
    );
  }
}