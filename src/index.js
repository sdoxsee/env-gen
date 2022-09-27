import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga';
import ReactGA4 from 'react-ga4';

ReactGA.initialize('UA-193353057-1');
ReactGA.pageview(window.location.pathname + window.location.search);
ReactGA4.initialize('G-K86M2ZT1DQ');
ReactGA4.send(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();