import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { UIColumn } from './UIColumn';
import { PlayBar } from './PlayBar';
import { Playlist } from './Playlist';

interface Props {
  albums: Array<Album>;
  songs: Array<Song>;
}

export class Page extends React.Component<Props, undefined> {
  props: Props;

  private playlistRef: Playlist;

  render() {
    return (
      <div className="page" id="page">
        <UIColumn 
          albums={this.props.albums} 
          songs={this.props.songs} 
          onSongClick={(song: Song, album: Album) => this.playlistRef.queueSong(song, album)}
        />
        <div className="artSection" />
        <Playlist ref={ref => this.playlistRef = ref}  />
        <PlayBar />
      </div>
    );
  }
}