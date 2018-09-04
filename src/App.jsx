import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home";
import Routes from "./routes";

class App extends Component {
    render() {
        return (
            <Router>
                    <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/routes" component={Routes} />
                </div>
            </Router>
        );
    }
}

export default App;