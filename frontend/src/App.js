import React, { Component } from 'react';
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import './App.css';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import ClientList from './ClientList';
import ClientEdit from "./ClientEdit";

class App extends Component {
  render() {
    return (

        <HashRouter>

          <Switch>
            <Route path='/' exact={true} component={ClientList}/>
            <Route path='/clients/:id' exact={true} component={ClientEdit}/>

          </Switch>

        </HashRouter>
    )
  }
}

export default App;