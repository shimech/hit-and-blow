import * as React from "react";
import "./Home.css";
import InputPanel from "./component/InputPanel";

interface Props {}
interface State {}

class Home extends React.Component<Props, State> {
  render() {
    return (
      <div className="Home">
        <h1 className="title">
          <span className="title-hit">HIT</span>
          <span className="title-and"> & </span>
          <span className="title-blow">BLOW</span>
        </h1>
        <InputPanel />
      </div>
    );
  }
}

export default Home;
