import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumListItemHeader } from './AlbumListItemHeader';
import { SongList } from './SongList';

interface Props {
  album: Album;
  directSongMatches: Array<Song>;
  isDirectMatch: boolean;
  isSearching: boolean;
  songs: Array<Song>;
  onSongClick: Function;
}

interface State {
  showSongList: boolean;
}

function songClick(evt: MouseEvent) {
  const audio = document.createElement('audio');
  audio.addEventListener('canplaythrough', evt => {
    audio.play();
  });
  audio.src = `http://dxmp.s3.amazonaws.com/songs/${this.filename}`;
  audio.load();
}

export class AlbumListItem extends React.Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      showSongList: false,
    };
  }

  render() {
    const songList = this.state.showSongList || this.props.isSearching
    ? (
      <SongList 
        album={this.props.album}
        directSongMatches={this.props.directSongMatches}
        isExpanded={true}
        isSearching={this.props.isSearching}
        songs={this.props.songs}
        onSongClick={this.props.onSongClick}
      />
    )
    : null;
    return (
      <li key={`album-${this.props.album.id}`}>
        <div onClick={this.onClick.bind(this)}>
          <AlbumListItemHeader 
            imageUrl={this.props.album.artUrl} 
            title={this.props.album.title} 
            id={this.props.album.id}
            isDirectMatch={this.props.isSearching && this.props.isDirectMatch}
          />
        </div>
        {songList}
      </li>
    );
  }

  onClick() {
    if (!this.props.isSearching) {
      this.setState({showSongList: !this.state.showSongList});
    }
  }
}