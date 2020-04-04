import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Game from "./Game/Game";
import ErrorPage from "./ErrorPage/ErrorPage";

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
            <Route path="/error" component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
