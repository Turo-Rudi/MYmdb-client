import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

// Import staement to indicate that I need to bundle '.index.scss'
import './index.scss';

// Main component (will eventually use all the others)
class MYmdbApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MYmdbApplication), container);