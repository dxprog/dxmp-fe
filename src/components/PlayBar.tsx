import * as React from 'react';

import { Album } from '../interfaces/album';
import AudioPlayer from '../services/audio-player';
import { Song } from '../interfaces/song';

interface Props {

}

export class PlayBar extends React.Component<Props, {}> {
  render() {
    return (
      <div className="audio-bar">

      </div>
    );
  }
}