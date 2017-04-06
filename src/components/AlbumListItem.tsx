import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumListItemHeader } from './AlbumListItemHeader';
import { SongList } from './SongList';
import { ListSimpleItem } from './ListSimpleItem';

interface Props {
  album: Album;
  songs: Array<Song>;
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
    return (
      <li key={`album-${this.props.album.id}`}>
        <div onClick={() => this.setState({showSongList: !this.state.showSongList})}>
          <AlbumListItemHeader 
            imageUrl={this.props.album.artUrl} 
            title={this.props.album.title} 
            id={this.props.album.id}
          />
        </div>
        {this.state.showSongList ? <SongList songs={this.props.songs} /> : null}
      </li>
    );
  }
}