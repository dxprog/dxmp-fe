import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Songs } from './data/songs';

import { Hello } from './components/Hello';

const songs = new Songs();
songs.getAll();

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById('example')
);