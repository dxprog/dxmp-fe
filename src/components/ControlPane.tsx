import { IAlbum, ISong } from 'dxmp-common';
import * as React from 'react';

import { ListPane } from './ListPane';

import './ControlPane.scss';

interface IControlPaneProps {
  albums: {[albumID: number]: IAlbum},
  songs: ISong[],
};

interface IControlPaneState {
  isExpanded: boolean,
};

export class ControlPane extends React.Component<IControlPaneProps, IControlPaneState> {
  public state: IControlPaneState = {isExpanded: false};

  public componentDidMount(): void {
    document.addEventListener("keypress", this.handleKeyPress.bind(this));
  }

  public render(): React.ReactNode {
    return (
      <div className="control-pane">
        {this.renderListPane()}
        <div className="control-bar">
          <button onClick={this.onListButtonClicked}>EXPAND</button>
          <div className="media-controls">
            BACK
            PLAY
            FORWARD
          </div>
        </div>
      </div>
    );
  }

  private onListButtonClicked = (): void => {
    this.setState({isExpanded: !this.state.isExpanded});
  }

  private renderListPane(): React.ReactNode {
    return this.state.isExpanded 
      ? <ListPane albums={this.props.albums} songs={this.props.songs}/> : null;
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (this.state.isExpanded) {
      return;
    }
    if (event.charCode >= 33 && event.charCode <= 126) {
      this.setState({isExpanded: true});
    }
  }
}