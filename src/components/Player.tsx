import * as React from 'react';

import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

interface PlayerProps {

}

export class Player extends React.Component<PlayerProps, {}> {
  private audioPlayer: HTMLAudioElement;

  constructor() {
    super();

    // Create the audioPlayer and set up the appropriate callbacks
    this.audioPlayer = document.createElement('audio');
    this.audioPlayer.addEventListener('canplaythrough', this.handleCanPlayThrough.bind(this));
  }

  render() {
    return (
      <div className="audio-bar">
      
      </div>
    );
  }

  playSong(song: Song, album: Album) {
    this.audioPlayer.src = `http://dxmp.s3.amazonaws.com/songs/${song.filename}`;
    this.audioPlayer.load();
  }

  private handleCanPlayThrough(evt: AudioProcessingEvent) {
    this.audioPlayer.play();
  }
}