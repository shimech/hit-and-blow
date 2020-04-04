import * as React from "react";

interface Answer {
  answer: string;
  hit: number;
  blow: number;
}

interface Props {
  playerNum: string;
  playerAns: Answer[];
  cpuAns: Answer[];
}
interface State {}

class ResultTable extends React.Component<Props, State> {
  generateRows = () => {
    let rows;
    if (this.props.playerAns.length >= this.props.cpuAns.length) {
      rows = this.props.playerAns.map((ans, index) => {
        if (index < this.props.cpuAns.length) {
          return (
            <tr>
              <td className="result">
                {ans.hit}
                <span className="hit">H</span>
                {ans.blow}
                <span className="blow">B</span>
              </td>
              <td className="num">{ans.answer}</td>
              <td className="num">{this.props.cpuAns[index].answer}</td>
              <td className="result">
                {this.props.cpuAns[index].hit}
                <span className="hit">H</span>
                {this.props.cpuAns[index].blow}
                <span className="blow">B</span>
              </td>
            </tr>
          );
        } else {
          return (
            <tr>
              <td className="result">
                {ans.hit}
                <span className="hit">H</span>
                {ans.blow}
                <span className="blow">B</span>
              </td>
              <td className="num">{ans.answer}</td>
            </tr>
          );
        }
      });
    } else {
      rows = this.props.cpuAns.map((ans, index) => {
        if (index < this.props.playerAns.length) {
          return (
            <tr>
              <td className="result">
                {this.props.playerAns[index].hit}
                <span className="hit">H</span>
                {this.props.playerAns[index].blow}
                <span className="blow">B</span>
              </td>
              <td className="num">{this.props.playerAns[index].answer}</td>
              <td className="num">{ans.answer}</td>
              <td className="result">
                {ans.hit}
                <span className="hit">H</span>
                {ans.blow}
                <span className="blow">B</span>
              </td>
            </tr>
          );
        } else {
          return (
            <tr>
              <td
                className="result"
                style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              ></td>
              <td
                className="num"
                style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              ></td>
              <td className="num">{ans.answer}</td>
              <td className="result">
                {ans.hit}
                <span className="hit">H</span>
                {ans.blow}
                <span className="blow">B</span>
              </td>
            </tr>
          );
        }
      });
    }
    return rows;
  };

  render() {
    const rows = this.generateRows();

    return (
      <div className="ResultTable">
        <table className="result-table">
          <thead>
            <tr className="label">
              <th colSpan={2}>あなた ({this.props.playerNum})</th>
              <th colSpan={2}>CPU (????)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default ResultTable;
