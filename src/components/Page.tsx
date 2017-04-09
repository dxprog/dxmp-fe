import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { UIColumn } from './UIColumn';
import { Player } from './Player';

interface Props {
  albums: Array<Album>;
  songs: Array<Song>;
}

export class Page extends React.Component<Props, undefined> {
  props: Props;

  private playerRef: Player;

  render() {
    return (
      <div className="page" id="page">
        <UIColumn 
          albums={this.props.albums} 
          songs={this.props.songs} 
          onSongClick={(song: Song, album: Album) => this.playerRef.playSong(song, album)}
        />
        <div className="artSection" />
        <Player ref={ref => this.playerRef = ref} />
      </div>
    );
  }
}