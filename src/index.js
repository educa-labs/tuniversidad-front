import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './config/routes';
import configureStore from './config/configureStore';
import './styles/index.css';


injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#424242',
    accent1Color: '#0091EA',
  },
  tabs: {
    backgroundColor: '#FFFFFF',
    selectedTextColor: '#424242',
    textColor: '#D2D2D2',
  },
  stepper: {
    iconColor: '#0091EA',
  },
  checkbox: {
    checkedColor: '#0091EA',
    requiredColor: '#0091EA',
  },
  radioButton: {
    checkedColor: '#0091EA',
  },
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router routes={routes} history={browserHistory} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
