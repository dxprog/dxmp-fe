import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { ListImageItem } from './ListImageItem';
import { ListSimpleItem } from './ListSimpleItem';

interface SongClickCallback {
  (song: Song, album: Album): void
}

interface ArrayListProps {
  album: Album;
  songs: Array<Song>;
  onSongClick: SongClickCallback;
}

function songClick(evt: MouseEvent) {
  const audio = document.createElement('audio');
  audio.addEventListener('canplaythrough', evt => {
    audio.play();
  });
  audio.src = `http://dxmp.s3.amazonaws.com/songs/${this.filename}`;
  audio.load();
}

export class AlbumList extends React.Component<ArrayListProps, {}> {
  render() {
    return (
      <ul key={`album-${this.props.album.id}`}>
        <ListImageItem imageUrl={this.props.album.artUrl} title={this.props.album.title} id={this.props.album.id} />
        <ul>
          {this.props.songs
            .filter(song => song.album_id === this.props.album.id)
            .map(song => 
              <ListSimpleItem 
                title={song.title} 
                id={song.id} 
                onClick={() => this.props.onSongClick(song, this.props.album)} />
            )}
        </ul>
      </ul>
    );
  }
}