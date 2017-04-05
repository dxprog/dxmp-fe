import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumList } from './AlbumList';
import { Player } from './Player';

export interface PageProps {
  albums: Array<Album>;
  songs: Array<Song>;
}

export class Page extends React.Component<PageProps, {}> {
  private playerRef: Player;

  render() {
    return (
      <div id="page">
        {this.props.albums.map(album => 
          <AlbumList 
            album={album}
            songs={this.props.songs}
            onSongClick={(song: Song, album: Album) => this.playerRef.playSong(song, album)} />
        )}
        <Player ref={ref => this.playerRef = ref} />
      </div>
    );
  }
}