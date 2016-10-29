import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';
import { ListImageItem } from './ListImageItem';

export interface ListProps {
  albums: Array<Album>;
  songs: Array<Song>;
}

export class List extends React.Component<ListProps, {}> {
  render() {
    return <ul>
      {this.props.albums.map(album => <ListImageItem imageUrl={album.artUrl} title={album.title} />)}
    </ul>;
  }
}