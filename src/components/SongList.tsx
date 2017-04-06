import * as React from 'react';
import { Song } from '../interfaces/song';

interface Props {
  songs: Array<Song>;
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
      <li className="songListItem" key={`song-${song.id}`}>
        <h3>{song.title}</h3>
      </li>
    )
  }
}