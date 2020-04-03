import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Game from "./Game/Game";

interface Props {}
interface State {}
class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game/:playerNum" component={Game} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
