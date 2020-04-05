import * as React from "react";

const initialValue = ["-", "-", "-", "-"];
const initialIsSelect = [true, false, false, false];

const selectColor = (isSelect: boolean) =>
  isSelect ? "rgb(255, 0, 0)" : "rgb(100, 100, 100)";

interface Props {}
interface State {
  value: string[];
  isSelect: boolean[];
  borderColor: string[];
  warning: string;
}
class InputPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: initialValue,
      isSelect: initialIsSelect,
      borderColor: initialIsSelect.map((isSelect) => selectColor(isSelect)),
      warning: "",
    };

    this.validateValue = this.validateValue.bind(this);
  }

  setBorderColor = () => {
    this.setState({
      borderColor: this.state.isSelect.map((isSelect) => selectColor(isSelect)),
    });
  };

  selectOneValue = (whichValue: number) => {
    const newIsSelect = [false, false, false, false].map(
      (value, index) => index === whichValue
    );
    this.setState({ isSelect: newIsSelect }, () => this.setBorderColor());
  };

  setValue = (value: string) => {
    if (value === "-") {
      this.setState(
        {
          value: initialValue,
          isSelect: initialIsSelect,
        },
        () => this.setBorderColor()
      );
    } else {
      const whichValue = this.state.isSelect.indexOf(true);
      if (whichValue !== -1) {
        const newValues = this.state.value.map((oldValue, index) =>
          index === whichValue ? value : oldValue
        );
        this.setState({ value: newValues });

        if (whichValue !== 3) {
          this.selectOneValue(whichValue + 1);
        }
      }
    }
  };

  validateValue = () => {
    let message = "";
    if (this.state.value.indexOf("-") !== -1) {
      message = "すべてのケタを入力してください";
    } else if (this.state.value.length !== new Set(this.state.value).size) {
      message = "数字の重複があります";
    }
    this.setState({ warning: message });

    if (message === "") {
      const playerNum = this.state.value.join("");
      window.location.href = `/game/${playerNum}`;
    }
  };

  render = () => {
    return (
      <div className="InputPanel">
        <div className="input-text">あなたの数字を入力してください</div>
        <div className="input-main">
          <div className="panel">
            <button className="zero-button" onClick={() => this.setValue("0")}>
              0
            </button>
            <button className="one-button" onClick={() => this.setValue("1")}>
              1
            </button>
            <button className="two-button" onClick={() => this.setValue("2")}>
              2
            </button>
            <button className="three-button" onClick={() => this.setValue("3")}>
              3
            </button>
            <button className="four-button" onClick={() => this.setValue("4")}>
              4
            </button>
            <button className="five-button" onClick={() => this.setValue("5")}>
              5
            </button>
            <button className="six-button" onClick={() => this.setValue("6")}>
              6
            </button>
            <button className="seven-button" onClick={() => this.setValue("7")}>
              7
            </button>
            <button className="eight-button" onClick={() => this.setValue("8")}>
              8
            </button>
            <button className="nine-button" onClick={() => this.setValue("9")}>
              9
            </button>
            <button className="clear" onClick={() => this.setValue("-")}>
              C
            </button>
            <button className="return" onClick={this.validateValue}>
              ⏎
            </button>
          </div>
          <div className="value">
            <button
              className="one-value"
              style={{ borderColor: this.state.borderColor[0] }}
              onClick={() => this.selectOneValue(0)}
            >
              {this.state.value[0]}
            </button>
            <button
              className="two-value"
              style={{ borderColor: this.state.borderColor[1] }}
              onClick={() => this.selectOneValue(1)}
            >
              {this.state.value[1]}
            </button>
            <button
              className="three-value"
              style={{ borderColor: this.state.borderColor[2] }}
              onClick={() => this.selectOneValue(2)}
            >
              {this.state.value[2]}
            </button>
            <button
              className="four-value"
              style={{ borderColor: this.state.borderColor[3] }}
              onClick={() => this.selectOneValue(3)}
            >
              {this.state.value[3]}
            </button>
          </div>
          <div className="warning">{this.state.warning}</div>
          <div className="submit">
            <button className="submit-button" onClick={this.validateValue}>
              ゲームスタート
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default InputPanel;
