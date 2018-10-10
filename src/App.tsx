import * as React from 'react';
import './App.scss';
import * as xhr from './lib/xhr';

interface IState {
  albums: any[],
  expandInterface: boolean,
};

class App extends React.Component<{}, IState> {
  public state: IState = {albums: [], expandInterface: false};

  public async componentDidMount(): Promise<any> {
    const albums = await xhr.request('http://api.dxmp.us/albums');
    console.log(albums);
    this.setState(albums);
  }

  public render() {
    return (
      <div className="App">
        <div className="InfoPane" />
        <div className="InterfacePane">
          Controls
        </div>
      </div>
    );
  }
}

export default App;
