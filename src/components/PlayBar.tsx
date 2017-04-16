import * as React from 'react';

import AudioPlayer from '../services/audio-player';
import { AUDIO_PROGRESS } from '../services/audio-player';

interface Props {}

interface State {
  progress: number
}

export class PlayBar extends React.Component<Props, State> {
  private currentTime: number;
  private progress: number;

  constructor() {
    super();

    this.state = { progress: 0 };
    AudioPlayer.on(AUDIO_PROGRESS, this.handleAudioProgress.bind(this));
  }

  render() {
    return (
      <div className="audio-bar">
        <div className="scrub-bar">
          <span className="playhead" style={{ left: `${this.state.progress * 100}%` }}></span>
        </div>
      </div>
    );
  }

  private handleAudioProgress(currentTime: number) {
    this.setState({ progress: currentTime / AudioPlayer.currentSong.duration });
  }
}