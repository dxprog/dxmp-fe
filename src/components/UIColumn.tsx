import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumList } from './AlbumList';
import { IconTextField } from './IconTextField';

interface Props {
  albums: Array<Album>;
  songs: Array<Song>;
  onSongClick: Function;
}

interface State {
  searchQuery: string;
}

export class UIColumn extends React.Component<Props, State> {
  props: Props;

  private searchQuery: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  render() {
    return (
      <div className="uiColumnContainer">
        <div className="uiColumn">
          <div className="searchBox">
            <IconTextField 
              rightIconSrc="http://www.clipartkid.com/images/775/search-icon-clip-art-at-clker-com-vector-clip-art-online-royalty-643l5L-clipart.png"
              onValueChange={this.onSearchQueryChange.bind(this)}
            />
          </div>
          <AlbumList 
            albums={this.props.albums} 
            searchQuery={this.state.searchQuery}
            songs={this.props.songs} 
            onSongClick={this.props.onSongClick}
          />
        </div>
      </div>
    );
  }

  onSearchQueryChange(newValue: string) {
    this.setState({searchQuery: newValue.toLowerCase()});
  }
}