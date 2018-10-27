import { Dictionary, IAlbum, ISong } from 'dxmp-common';
import * as React from 'react';

import { SearchTab } from './SearchTab';

import './ListPane.scss';

interface IListPaneProps {
  albums: Dictionary<IAlbum>,
  songs: ISong[],
};

interface IListPaneState {
  currentTab: 'search',
};

export class ListPane extends React.Component<IListPaneProps, IListPaneState> {
  public state: IListPaneState = {
    currentTab: 'search',
  }

  public render(): React.ReactNode {
    return (
      <div className="list-pane">
        <div className="meta-list"/>
        {this.renderCurrentTab()}
        <div className="queue"/>
      </div>
    );
  }

  private renderCurrentTab(): React.ReactNode {
    switch (this.state.currentTab) {
      case 'search':
        return <SearchTab albums={this.props.albums} songs={this.props.songs}/>;
    }
  }
}