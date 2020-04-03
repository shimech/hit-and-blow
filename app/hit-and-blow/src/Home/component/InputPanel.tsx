import * as React from "react";

interface Props {}
interface State {
  value: string[];
  isSelect: boolean[];
  borderColor: string[];
  warning: string;
}

const selectColor = (isSelect: boolean) =>
  isSelect ? "rgb(255, 0, 0)" : "rgb(100, 100, 100)";

class InputPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: ["-", "-", "-", "-"],
      isSelect: [true, false, false, false],
      borderColor: [
        selectColor(true),
        selectColor(false),
        selectColor(false),
        selectColor(false)
      ],
      warning: ""
    };
    this.validateValue = this.validateValue.bind(this);
  }

  setBorderColor = () => {
    this.setState({
      borderColor: [
        selectColor(this.state.isSelect[0]),
        selectColor(this.state.isSelect[1]),
        selectColor(this.state.isSelect[2]),
        selectColor(this.state.isSelect[3])
      ]
    });
  };

  selectOneValue = (whichValue: number) => {
    let newState = [false, false, false, false];
    newState[whichValue] = true;
    this.setState(
      {
        isSelect: newState
      },
      () => {
        this.setBorderColor();
      }
    );
  };

  setValue = (value: string) => {
    if (value === "-") {
      this.setState(
        {
          value: ["-", "-", "-", "-"],
          isSelect: [true, false, false, false]
        },
        () => this.setBorderColor()
      );
    } else {
      const whichValue = this.state.isSelect.indexOf(true);
      if (whichValue !== -1) {
        let newValue = this.state.value;
        newValue[whichValue] = value;
        this.setState({
          value: newValue
        });

        if (whichValue !== 3) {
          this.selectOneValue(whichValue + 1);
        }
      }
    }
    console.log(this.state.value);
  };

  validateValue = () => {
    let message = "";
    if (this.state.value.indexOf("-") !== -1) {
      message = "すべてのケタを入力してください";
    } else if (this.state.value.length !== new Set(this.state.value).size) {
      message = "数字の重複があります";
    }
    this.setState({
      warning: message
    });
    if (message === "") {
      const playerNum = this.state.value.join("");
      window.location.href = `/game/${playerNum}`;
    }
  };

  render() {
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
            <button className="return">⏎</button>
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
  }
}

export default InputPanel;
