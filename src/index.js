import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd-mobile/dist/antd-mobile.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";

ReactDOM.render(
    <Router>
        <div>
            <App/>
        </div>
    </Router>, document.getElementById('root')
);

serviceWorker.unregister();
