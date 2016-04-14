import ReactDOM from 'react-dom';
import App from './App.jsx';
import Constants from './Constants.js';
// console.log(Constants);
// console.log(App);
ReactDOM.render(<App dataUri={Constants.dataUri} itemUri={Constants.itemUri} />, document.getElementById('app-container'));
