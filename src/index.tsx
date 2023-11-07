import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from '@adobe/react-spectrum';
import { lightTheme } from '@adobe/react-spectrum';
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider theme={lightTheme}>
    <App />
  </Provider>,
  document.getElementById('root')
);