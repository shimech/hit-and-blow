import * as React from "react";
import "./Game.css";
import candidates from "../db/candidates_len4.json";
import ResultTable from "./component/ResultTable";
import AnswerPanel from "./component/AnswerPanel";

interface Candidate {
  value: string;
  isRemain: boolean;
}

interface Answer {
  answer: string;
  hit: number;
  blow: number;
}

const screenLock = () => {
  const element = document.createElement("div");
  element.id = "screen-lock";
  element.style.height = "100vh";
  element.style.width = "100vw";
  element.style.position = "fixed";
  element.style.top = "0px";
  element.style.left = "0px";
  element.style.zIndex = "9999";
  element.style.opacity = "0";
  let objBody = document.querySelector("body");
  objBody?.appendChild(element);
};

const deleteDomObj = (idName: string) => {
  const domObj = document.getElementById(idName);
  const domObjParent = domObj?.parentNode;
  domObjParent?.removeChild(domObj as Node);
};

const selectRandomNum = (candidates: Candidate[]) => {
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index].value;
};

const whichIsFirst = () => Math.random() < 0.5;

const calcHitAndBlow = (num: string, ans: string) => {
  let countHit = 0;
  let countBlow = 0;
  for (var i = 0; i < num.length; i++) {
    if (num[i] === ans[i]) {
      countHit += 1;
    } else if (ans.match(num[i])) {
      countBlow += 1;
    }
  }
  let ansObj: Answer = {
    answer: "",
    hit: 0,
    blow: 0,
  };
  ansObj.answer = ans;
  ansObj.hit = countHit;
  ansObj.blow = countBlow;
  return ansObj;
};
interface Props {
  match: any;
}
interface State {
  message: string;
  playerNum: string;
  playerInputNum: string;
  playerAns: Answer[];
  playerCan: Candidate[];
  cpuNum: string;
  cpuAns: Answer[];
  cpuCan: Candidate[];
  isPlayerTurn: boolean;
  winner: string;
}
class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const isPlayerFirst = whichIsFirst();
    const winner = "";

    this.state = {
      message: this.setMessage(isPlayerFirst, winner),
      playerNum: this.props.match.params.playerNum,
      playerInputNum: "",
      playerAns: [],
      playerCan: candidates,
      cpuNum: selectRandomNum(candidates),
      cpuAns: [],
      cpuCan: candidates,
      isPlayerTurn: isPlayerFirst,
      winner: winner,
    };

    if (!isPlayerFirst) {
      screenLock();
      setTimeout(() => {
        this.handleCpuTurn();
        deleteDomObj("screen-lock");
      }, 2000);
    }
  }

  setInputNum = (inputNum: string) => {
    if (this.state.winner === "") {
      this.setState(
        {
          playerInputNum: inputNum,
        },
        () => {
          const ansObj = calcHitAndBlow(this.state.cpuNum, inputNum);
          this.setAnswer(ansObj, true);
          if (ansObj.hit === 4) {
            this.setState(
              {
                winner: "あなた",
              },
              () => {
                this.updateMessage();
              }
            );
          } else {
            this.changeTurn();
            screenLock();
            setTimeout(() => {
              this.handleCpuTurn();
              deleteDomObj("screen-lock");
            }, 2000);
          }
        }
      );
    }
  };

  setAnswer = (ansObj: Answer, isPlayer: boolean) => {
    if (isPlayer) {
      const newAns = this.state.playerAns.concat([ansObj]);
      this.setState({
        playerAns: newAns,
      });
    } else {
      const newAns = this.state.cpuAns.concat([ansObj]);
      this.setState({
        cpuAns: newAns,
      });
    }
  };

  setMessage = (isPlayerTurn: boolean, winner: string) => {
    let message;
    if (winner !== "") {
      message = `${winner}の勝利！`;
    } else {
      if (isPlayerTurn) {
        message = "あなたのターンです。相手の数字を予想してください。";
      } else {
        message = "相手のターンです。しばらくお待ちください。";
      }
    }
    return message;
  };

  updateMessage = () => {
    this.setState({
      message: this.setMessage(this.state.isPlayerTurn, this.state.winner),
    });
  };

  changeTurn = () => {
    this.setState(
      {
        isPlayerTurn: !this.state.isPlayerTurn,
      },
      () => this.updateMessage()
    );
  };

  handleCpuTurn = () => {
    const cpuCandidates = this.state.cpuCan.filter(
      (candidate) => candidate.isRemain
    );
    const cpuInputNum = selectRandomNum(cpuCandidates);
    const ansObj = calcHitAndBlow(this.state.playerNum, cpuInputNum);
    this.setAnswer(ansObj, false);
    if (ansObj.hit === 4) {
      this.setState(
        {
          winner: "CPU",
        },
        () => {
          this.updateMessage();
        }
      );
    } else {
      const newCpuCan = this.state.cpuCan;
      newCpuCan.forEach((item, index) => {
        const hitAndBlow = calcHitAndBlow(cpuInputNum, item.value);
        if (
          !(hitAndBlow.hit === ansObj.hit && hitAndBlow.blow === ansObj.blow)
        ) {
          const newItem = {
            value: item.value,
            isRemain: false,
          };
          newCpuCan.splice(index, 1, newItem);
        }
      });
      this.changeTurn();
    }
  };

  render() {
    return (
      <div className="Game">
        <div className="status-message">
          <p>{this.state.message}</p>
        </div>
        <div className="game-main">
          <ResultTable
            playerNum={this.state.playerNum}
            playerAns={this.state.playerAns}
            cpuAns={this.state.cpuAns}
          />
          <AnswerPanel updateInputNum={this.setInputNum} />
          <div className="back-to-home">
            <a href="/">
              <button>ホームへ戻る</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
