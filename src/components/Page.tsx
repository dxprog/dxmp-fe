import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumListItem } from './AlbumListItem';
import { PlayBar } from './PlayBar';
import { Playlist } from './Playlist';

interface Props {
  albums: Array<Album>;
  songs: Array<Song>;
}

interface SongHashLookup {
  [key: number]: Array<Song>;
}

export class Page extends React.Component<Props, undefined> {
  props: Props;

  private playlistRef: Playlist;
  private songAlbumLookup: SongHashLookup;

  componentWillMount() {
    this.optimizeSongs();
  }

  render() {
    return (
      <div id="page">
        <ul id="album-list">
          {this.props.albums.map(album => (
            <AlbumListItem
              album={album}
              key={`album-list-${album.id}`}
              songs={this.songAlbumLookup[album.id]}
              onSongClick={(song: Song, album: Album) => this.playlistRef.queueSong(song, album)}
            />
          ))}
        </ul>
        <Playlist ref={ref => this.playlistRef = ref}  />
        <PlayBar />
      </div>
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