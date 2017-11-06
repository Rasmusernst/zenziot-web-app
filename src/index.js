import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

// ReactDOM.render(
//  <App name="Glarbo" />,
//  document.getElementById('root')
//  );

 const render = Component => {
   ReactDOM.render(
     <AppContainer>
       <Component />
     </AppContainer>,
     document.getElementById('root'),
   )
 }

 render(App)

 // Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}
