import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumListItem } from './AlbumListItem';
import { Player } from './Player';

interface Props {
  albums: Array<Album>;
  songs: Array<Song>;
}

interface SongHashLookup {
  [key: number]: Array<Song>;
}

export class Page extends React.Component<Props, undefined> {
  props: Props;

  private playerRef: Player;
  private songAlbumLookup: SongHashLookup;

  componentWillMount() {
    this.optimizeSongs();
  }

  render() {
    return (
      <ul id="page">
        {this.props.albums.map(album => (
          <AlbumListItem 
            album={album} 
            key={`album-list-${album.id}`}
            songs={this.songAlbumLookup[album.id]} 
            onSongClick={(song: Song, album: Album) => this.playerRef.playSong(song, album)}
          />
        ))}
        <Player ref={ref => this.playerRef = ref} />
      </ul>
    );
  }

  optimizeSongs() {
    // Rearrange the song data in a fashion that's easier to lookup by album ID
    this.songAlbumLookup = {};
    this.props.songs.forEach(song => {
      if (!this.songAlbumLookup[song.album_id]) {
        this.songAlbumLookup[song.album_id] = [];
      }
      this.songAlbumLookup[song.album_id].push(song);
    });
  }
}