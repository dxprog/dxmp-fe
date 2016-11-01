import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumList } from './AlbumList';

export interface PageProps {
  albums: Array<Album>;
  songs: Array<Song>;
}

export class Page extends React.Component<PageProps, {}> {
  render() {
    return <div id="page">
      {this.props.albums.map(album => <AlbumList album={album} songs={this.props.songs} />)}
    </div>;
  }
}