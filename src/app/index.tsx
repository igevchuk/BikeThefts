import * as React from 'react';
import { Route, Switch } from 'react-router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Home } from 'app/containers/Home';
import { IncidentDetails } from 'app/containers/IncidentDetails';
import { hot } from 'react-hot-loader';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,700&display=swap');
  }
  body {
    background-color: #f5f5f5;
    color: black;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 16px;
  }
`;

export const App = hot(module)(() => (
  <ThemeProvider theme={{ primaryColor: '#3498db' }}>
    <React.Fragment>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/:id" component={IncidentDetails} />
      </Switch>
    </React.Fragment>
  </ThemeProvider>
));
