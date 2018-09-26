import React from 'react';
import Loadable from 'react-loadable';
import path from 'path';
import fakeDelay from './fakeDelay';

import Loader from '../loader';

const LoadComponent = (component) => {
  const LoadableAnotherComponent = Loadable({
    loader: () => fakeDelay(400).then(() => import(component)),
    LoadingComponent: Loader,
    serverSideRequirePath: path.resolve(__dirname, component),
  });

  return (<LoadableAnotherComponent />);
};

// const LoadableAnotherComponent = Loadable({
//   loader: () => require('./another-component'),
//   LoadingComponent: <Loader spinning fullScreen />,
// });

// class LoadComponent extends React.Component {
//   render() {
//     return <LoadableAnotherComponent />;
//   }
// }

export default LoadComponent;
