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

export class AlbumList extends React.Component<ArrayListProps, {}> {
  render() {
    const { album } = this.props;
    return (
      <ul key={`album-${album.id}`}>
        <ListImageItem imageUrl={album.artUrl} title={album.title} id={album.id} />
        <ul>
          {this.props.songs
            .map(song =>
              <ListSimpleItem
                key={`song-${song.id}`}
                title={song.title}
                id={song.id}
                onClick={() => this.props.onSongClick(song, album)} />
            )}
        </ul>
      </ul>
    );
  }
}