import './App.scss';
import { ArtPane } from './components/ArtPane';
import { ControlPane } from './components/ControlPane';
import * as xhr from './lib/xhr';

import { IAlbum, ISong } from 'dxmp-common';
import * as React from 'react';

interface IState {
  albums: IAlbum[],
  expandInterface: boolean,
  songs: ISong[],
};

class App extends React.Component<{}, IState> {
  public state: IState = {
    albums: [], 
    expandInterface: false,
    songs: [],
  };

  public async componentDidMount(): Promise<any> {
    const [albums, songs] = await Promise.all([
      xhr.request('http://api.dxmp.us/albums'),
      xhr.request('http://api.dxmp.us/songs'),
    ]);
    this.setState({albums: albums as IAlbum[], songs: songs as ISong[]});
  }

  public render() {
    return (
      <div className="App">
        <ArtPane />
        <ControlPane albums={this.state.albums} songs={this.state.songs}/>
      </div>
    );
  }

}

export default App;
