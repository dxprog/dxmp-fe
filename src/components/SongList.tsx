import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

interface Props {
  album: Album;
  songs: Array<Song>;
  onSongClick: Function;
}

export class SongList extends React.Component<Props, undefined> {
  props: Props;

  render() {
    return (
      <ul className="songList">
        {this.props.songs.map((song) => this.renderSongListItem(song))}
      </ul>
    );
  }

  renderSongListItem(song: Song) {
    return (
      <li 
        className="songListItem" 
        key={`song-${song.id}`} 
        onClick={() => this.props.onSongClick(song, this.props.album)}
      >
        <h3>{song.title}</h3>
      </li>
    )
  }
}