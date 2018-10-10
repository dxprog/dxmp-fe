import { IAlbum } from 'dxmp-common';
import * as React from 'react';

import './ControlPane.scss';

interface IControlPaneProps {
  albums: IAlbum[],
};

interface IControlPaneState {
  isExpanded: boolean,
};

export class ControlPane extends React.Component<IControlPaneProps, IControlPaneState> {
  public state: IControlPaneState = {isExpanded: false};

  public render(): React.ReactNode {
    return (
      <div className="control-pane">
        {this.renderListPane()}
        <div className="control-bar">
          <div onClick={this.onListButtonClicked}>EXPAND</div>
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
    if (!this.state.isExpanded) {
      return null;
    }
    return <div className="list-pane" />;
  }
}