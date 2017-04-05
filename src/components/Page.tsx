import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumList } from './AlbumList';
import { Player } from './Player';

interface PageProps {
  albums: Array<Album>;
  songs: Array<Song>;
}

interface SongHashLookup {
  [key: number]: Array<Song>;
}

export class Page extends React.Component<PageProps, {}> {
  private playerRef: Player;
  private songAlbumLookup: SongHashLookup;

  render() {
    return (
      <div id="page">
        {this.props.albums.map(album => {
          if (this.songAlbumLookup[album.id]) {
            return <AlbumList
              key={`album-list-${album.id}`}
              album={album}
              songs={this.songAlbumLookup[album.id]}
              onSongClick={(song: Song, album: Album) => this.playerRef.playSong(song, album)} />
          }
        })}
        <Player ref={ref => this.playerRef = ref} />
      </div>
    );
  }

  componentWillMount() {
    this.optimizeSongs();
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