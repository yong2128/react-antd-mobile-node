import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom'; 
import Main from './pages/Main.js';
import Login from './pages/Login.js';
import Index from './pages/Index.js';
import store from './store';
import EditSelfInfo from "./pages/components/editSelfInfo"


function App() {
  return (
    <Provider store={store}>
      <Route path="/" exact component={Main}></Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/index" exact component={Index}></Route>
      <Route path="/selfInfo" exact component={EditSelfInfo}></Route>
    </Provider>
  );
}

export default App;
