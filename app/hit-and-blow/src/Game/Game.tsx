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

  const objBody = document.querySelector("body");
  objBody?.appendChild(element);
};

const deleteDomObj = (idName: string) => {
  const domObj = document.getElementById(idName);
  const domObjParent = domObj?.parentNode;
  domObjParent?.removeChild(domObj as Node);
};

const cpuTurnTime = 2000;

const whichIsFirst = () => Math.random() < 0.5;

const selectRandomNum = (candidates: Candidate[]) => {
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index].value;
};

const calcHitAndBlow = (num: string, ans: string) => {
  let hit = 0;
  let blow = 0;
  for (let i = 0; i < num.length; i++) {
    if (num[i] === ans[i]) {
      hit += 1;
    } else if (ans.match(num[i])) {
      blow += 1;
    }
  }

  const ansObj: Answer = {
    value: ans,
    hit: hit,
    blow: blow,
  };
  return ansObj;
};
interface Props {
  match: any;
  history: any;
}
interface State {
  message: string;
  player: PlayerInfo;
  cpu: CpuInfo;
  isPlayerTurn: boolean;
  winner: string;
}

const isCorrectPlayerNum = (playerNum: string) => {
  const onlyNum = playerNum.replace(/[^0-9]/g, "");
  if (playerNum.length !== onlyNum.length) return false;

  const array = onlyNum.split("");
  const arrayRemoved = array.filter(
    (item, index, self) => self.indexOf(item) === index
  );
  const numRemoved = arrayRemoved.join("");
  if (onlyNum.length !== numRemoved.length) return false;

  return numRemoved.length === 4;
};
class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const isPlayerFirst = whichIsFirst();
    const winner = "";

    this.state = {
      message: this.setMessage(isPlayerFirst, winner),
      player: {
        number: this.props.match.params.playerNum,
        latestAns: "",
        answers: [],
      },
      cpu: {
        number: selectRandomNum(candidates),
        answers: [],
        candidates: candidates,
      },
      isPlayerTurn: isPlayerFirst,
      winner: winner,
    };
  }

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

  setLatestAns = (latestAns: string) => {
    if (this.state.winner === "") {
      const newPlayerObj: PlayerInfo = this.state.player;
      newPlayerObj.latestAns = latestAns;
      this.setState({ player: newPlayerObj }, () => this.executePlayerTurn());
    }
  };

  setAnswer = (ansObj: Answer, isPlayer: boolean) => {
    if (isPlayer) {
      const newPlayerObj = this.state.player;
      newPlayerObj.answers = newPlayerObj.answers.concat([ansObj]);
      this.setState({ player: newPlayerObj });
    } else {
      const newCpuObj = this.state.cpu;
      newCpuObj.answers = newCpuObj.answers.concat([ansObj]);
      this.setState({ cpu: newCpuObj });
    }
  };

  changeTurn = () => {
    this.setState({ isPlayerTurn: !this.state.isPlayerTurn }, () =>
      this.updateMessage()
    );
  };

  executePlayerTurn = () => {
    const ansObj = calcHitAndBlow(
      this.state.cpu.number,
      this.state.player.latestAns
    );
    this.setAnswer(ansObj, true);
    if (ansObj.hit === 4) {
      this.setState({ winner: "あなた" }, () => this.updateMessage());
    } else {
      this.changeTurn();

      screenLock();
      setTimeout(() => {
        this.executeCpuTurn();
        deleteDomObj("screen-lock");
      }, cpuTurnTime);
    }
  };

  updateCpuCandidates = (
    cpuLatestAns: string,
    latestAnsObj: Answer,
    callback: () => void
  ) => {
    const newCpuCandidates = this.state.cpu.candidates;
    newCpuCandidates.map((candidate) => {
      const hitAndBlow = calcHitAndBlow(cpuLatestAns, candidate.value);
      candidate.isRemain =
        hitAndBlow.hit === latestAnsObj.hit &&
        hitAndBlow.blow === latestAnsObj.blow &&
        candidate.isRemain;
      return candidate;
    });
    const newCpuObj = this.state.cpu;
    newCpuObj.candidates = newCpuCandidates;
    this.setState({ cpu: newCpuObj }, callback);
  };

  executeCpuTurn = () => {
    const cpuCandidatesRemained = this.state.cpu.candidates.filter(
      (candidate) => candidate.isRemain
    );
    const cpuLatestAns = selectRandomNum(cpuCandidatesRemained);
    const ansObj = calcHitAndBlow(this.state.player.number, cpuLatestAns);
    this.setAnswer(ansObj, false);

    if (ansObj.hit === 4) {
      this.setState({ winner: "CPU" }, () => this.updateMessage());
    } else {
      this.updateCpuCandidates(cpuLatestAns, ansObj, () => this.changeTurn());
    }
  };

  componentDidMount = () => {
    if (!isCorrectPlayerNum(this.state.player.number)) {
      this.props.history.push("/error");
    } else if (!this.state.isPlayerTurn) {
      screenLock();
      setTimeout(() => {
        this.executeCpuTurn();
        deleteDomObj("screen-lock");
      }, cpuTurnTime);
    }
  };

  render = () => {
    return (
      <div className="Game">
        <div className="status-message">
          <p>{this.state.message}</p>
        </div>
        <div className="game-main">
          <ResultTable
            player={this.state.player}
            cpu={this.state.cpu}
            winner={this.state.winner}
          />
          <AnswerPanel setLatestAns={this.setLatestAns} />
          <div className="back-to-home">
            <a href="/">
              <button>ホームへ戻る</button>
            </a>
          </div>
        </div>
      </div>
    );
  };
}

export default Game;
