import React from "react";
import "antd/dist/antd.css";
import "./css/myStyle.scss";
import "./App.css";
import Home from "./pages/Home";
import { HashRouter, Route, Switch } from "react-router-dom";
import Check from "./pages/Check";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/:id" component={Check} />
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
