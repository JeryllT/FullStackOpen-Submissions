import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

/*
.createRoot instantialises the starting point of a React component 
(I.E where to start insertion of html component)

.render is used to insert html based on the starting point declared with .createRoot
(I.E <App /> takes the html from "App" component located in App.js)
Since "App" as a component is a function, it can take in inputs as well
(E.g Within App.js, app function = app(name), with render, <App name="Jeryll"> would send
"Jeryll" as an argument to App.js's app(name) function)
*/

