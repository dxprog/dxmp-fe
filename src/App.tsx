import './App.scss';
import { ArtPane } from './components/ArtPane';
import { ControlPane } from './components/ControlPane';
import * as xhr from './lib/xhr';

import { IAlbum } from 'dxmp-common';
import * as React from 'react';

interface IState {
  albums: IAlbum[],
  expandInterface: boolean,
};

class App extends React.Component<{}, IState> {
  public state: IState = {
    albums: [], 
    expandInterface: false,
  };

  public async componentDidMount(): Promise<any> {
    const albums = await xhr.request('http://api.dxmp.us/albums');
    this.setState(albums);
  }

  public render() {
    return (
      <div className="App">
        <ArtPane />
        <ControlPane albums={this.state.albums} />
      </div>
    );
  }

}

export default App;
