import React, { Component } from 'react';
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductDetail from "./containers/ProductDetail/ProductDetail"
import ProductList from "./containers/ProductList/ProductList"

class App extends Component {
  render() {
    return (
      <>
        <div className="layout">
        <Router>
            <Header />
            <div className="content">
              <Switch>
                <Route exact path="/items/:id" component={ProductDetail}/>
                <Route exact path="/items" component={ProductList}/>
              </Switch>
            </div>
        </Router>
        </div>
      </>
    );
  }
}

export default App;

