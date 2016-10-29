import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

export interface ListProps {
  albums: Array<Album>;
  songs: Array<Song>;
}

export class List extends React.Component<ListProps, {}> {
  render() {
    return <ul>
      {this.props.albums.map(album => <li><h2>{album.title}</h2></li>)}
    </ul>;
  }
}