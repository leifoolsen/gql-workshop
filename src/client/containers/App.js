import React from 'react';
import {hot} from 'react-hot-loader';
import Utlegg from './Utlegg';
import PostboksSaver from './PostboksSaver';
// import Rofs from './Rofs';

const App = () => (
  <div>
    <Utlegg />
    <PostboksSaver />
    {/* <Rofs /> */}
  </div>);

export default hot(module)(App);
