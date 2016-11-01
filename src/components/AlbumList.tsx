import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { ListImageItem } from './ListImageItem';
import { ListSimpleItem } from './ListSimpleItem';

export interface ArrayListProps {
  album: Album;
  songs: Array<Song>;
}

export class AlbumList extends React.Component<ArrayListProps, {}> {
  render() {
    return ( 
      <ul key="album-${this.props.album.id}">
        <ListImageItem imageUrl={this.props.album.artUrl} title={this.props.album.title} id={this.props.album.id} />
        <ul>
          {this.props.songs.filter(song => song.album_id === this.props.album.id).map(song => <ListSimpleItem title={song.title} id={song.id} />)}
        </ul>
      </ul>
    );
  }
}