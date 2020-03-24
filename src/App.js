import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle.min";

import PostAdd from "./components/post/add.component";
import PostShow from "./components/post/show.component";
import PostIndex from "./components/post/index.component";
import { Router, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <Link to={"/posts"} className="nav-link">
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Add
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/posts"]} component={PostIndex} />
              <Route exact path="/add" component={PostAdd} />
              <Route exact path="/posts/:id" component={PostShow} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;