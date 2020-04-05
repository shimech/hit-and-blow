import * as React from "react";

interface Candidate {
  value: string;
  isRemain: boolean;
}
interface Answer {
  value: string;
  hit: number;
  blow: number;
}

interface PlayerInfo {
  number: string;
  answers: Answer[];
  latestAns: string;
}

interface CpuInfo {
  number: string;
  answers: Answer[];
  candidates: Candidate[];
}

interface Props {
  player: PlayerInfo;
  cpu: CpuInfo;
  winner: string;
}
interface State {}

class ResultTable extends React.Component<Props, State> {
  generateRows = () => {
    const playerAns = this.props.player.answers;
    const cpuAns = this.props.cpu.answers;
    let rows;
    if (playerAns.length >= cpuAns.length) {
      rows = playerAns.map((ansObj, index) => {
        if (index < cpuAns.length) {
          return (
            <tr key={index}>
              <td className="result">
                {ansObj.hit}
                <span className="hit">H</span>
                {ansObj.blow}
                <span className="blow">B</span>
              </td>
              <td className="num">{ansObj.value}</td>
              <td className="num">{cpuAns[index].value}</td>
              <td className="result">
                {cpuAns[index].hit}
                <span className="hit">H</span>
                {cpuAns[index].blow}
                <span className="blow">B</span>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={index}>
              <td className="result">
                {ansObj.hit}
                <span className="hit">H</span>
                {ansObj.blow}
                <span className="blow">B</span>
              </td>
              <td className="num">{ansObj.value}</td>
            </tr>
          );
        }
      });
    } else {
      rows = cpuAns.map((ansObj, index) => {
        if (index < playerAns.length) {
          return (
            <tr key={index}>
              <td className="result">
                {playerAns[index].hit}
                <span className="hit">H</span>
                {playerAns[index].blow}
                <span className="blow">B</span>
              </td>
              <td className="num">{playerAns[index].value}</td>
              <td className="num">{ansObj.value}</td>
              <td className="result">
                {ansObj.hit}
                <span className="hit">H</span>
                {ansObj.blow}
                <span className="blow">B</span>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={index}>
              <td className="result" style={{ opacity: "0" }}></td>
              <td className="num" style={{ opacity: "0" }}></td>
              <td className="num">{ansObj.value}</td>
              <td className="result">
                {ansObj.hit}
                <span className="hit">H</span>
                {ansObj.blow}
                <span className="blow">B</span>
              </td>
            </tr>
          );
        }
      });
    }
    return rows;
  };

  controlCpuNum = () =>
    this.props.winner === "" ? "????" : this.props.cpu.number;

  render = () => {
    const rows = this.generateRows();

    return (
      <div className="ResultTable">
        <table className="result-table">
          <thead>
            <tr className="label">
              <th colSpan={2}>あなた ({this.props.player.number})</th>
              <th colSpan={2}>CPU ({this.controlCpuNum()})</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };
}

export default ResultTable;
