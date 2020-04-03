import * as React from "react";

interface Props {
  match: any;
}
interface State {
  playerNum: string;
}

class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      playerNum: this.props.match.params.playerNum
    };
  }

  render() {
    return <div className="Game">{this.state.playerNum}</div>;
  }
}

export default Game;
