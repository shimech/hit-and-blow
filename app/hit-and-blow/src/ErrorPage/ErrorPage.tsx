import * as React from "react";
import "./ErrorPage.css";

const maxTime = 3000;
const interval = 1000;

interface Props {
  history: any;
}
interface State {
  time: number;
  intervalId?: NodeJS.Timeout;
}

class ErrorPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      time: Math.floor(maxTime / interval),
      intervalId: undefined,
    };

    this.countDown = this.countDown.bind(this);
    this.backToHome = this.backToHome.bind(this);
  }

  countDown = () => this.setState({ time: this.state.time - 1 });

  backToHome = () => this.props.history.push("/");

  componentDidMount = () => {
    this.setState({ intervalId: setInterval(this.countDown, interval) });
    setTimeout(this.backToHome, maxTime);
  };

  render = () => {
    return (
      <div className="ErrorPage">
        <h1 className="error-title">
          エラーが発生しました。{this.state.time}
          秒後にホームへ戻ります。
        </h1>
      </div>
    );
  };

  componentWillUnmount = () =>
    clearInterval(this.state.intervalId as NodeJS.Timeout);
}

export default ErrorPage;
