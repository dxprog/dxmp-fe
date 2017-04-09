import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

interface Props {
  album: Album;
  directSongMatches: Array<Song>;
  isExpanded: boolean;
  songs: Array<Song>;
  onSongClick: Function;
}

export class SongList extends React.Component<Props, undefined> {
  props: Props;

  render() {
    if (!this.props.songs) {
      return null;
    }

    const classNames = ['songList'];
    if (this.props.isExpanded) {
      classNames.push('expanded');
    }

    return (
      <ul className={classNames.join(' ')}>
        {this.props.songs.map((song) => this.renderSongListItem(song))}
      </ul>
    );
  }

  renderSongListItem(song: Song) {
    const classNames = ['songListItem'];
    if (
      this.props.directSongMatches && 
      this.props.directSongMatches.some(s => s.id === song.id)
    ) {
      classNames.push('songListItemMatch');
    }
    return (
      <li 
        className={classNames.join(' ')} 
        key={`song-${song.id}`} 
        onClick={() => this.props.onSongClick(song, this.props.album)}
      >
        <h4>{song.title}</h4>
      </li>
    )
  }
}