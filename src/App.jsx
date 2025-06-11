import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import { db } from "./firebase";
import {ref, set, get} from "firebase/database";

function App() {
  const uploadAddress = ref(db, "game");
  const numbers = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41],
  ];

  const [connectFour, setConnectFour] = useState(numbers);
  const [win, setWin] = useState(false);
  const [player, setPlayer] = useState("Red");
  const [rowCounters, setRowCounters] = useState([5, 5, 5, 5, 5, 5, 5]);
  const [game, setGame] = useState({
    connectFour: connectFour,
    win: win,
    player: player,
    rowCounters: rowCounters,
  });

  console.log(game);

  const dropCoin = (i) => {
    if (win === false && rowCounters[i] >= 0) {
      const newNumbers = [...connectFour];
      if (player === "Red") {
        newNumbers[i][rowCounters[i]] = "R";
      } else {
        newNumbers[i][rowCounters[i]] = "Y";
      }
      const newRowCounters = [...rowCounters];
      newRowCounters[i] = newRowCounters[i] - 1;
      setRowCounters(newRowCounters);
      setConnectFour(newNumbers);
      if (player === "Red") {
        setPlayer("Yellow");
      } else {
        setPlayer("Red");
      }
    }
  };

  const checkWin = () => {
    const colWins = [
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [6, 7, 8, 9],
      [7, 8, 9, 10],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [13, 14, 15, 16],
      [14, 15, 16, 17],
      [18, 19, 20, 21],
      [19, 20, 21, 22],
      [20, 21, 22, 23],
      [24, 25, 26, 27],
      [25, 26, 27, 28],
      [26, 27, 28, 29],
      [30, 31, 32, 33],
      [31, 32, 33, 34],
      [32, 33, 34, 35],
      [36, 37, 38, 39],
      [37, 38, 39, 40],
      [38, 39, 40, 41],
    ];

    const rowWins = [
      [0, 6, 12, 18],
      [1, 7, 13, 19],
      [2, 8, 14, 20],
      [3, 9, 15, 21],
      [4, 10, 16, 22],
      [5, 11, 17, 23],
      [6, 12, 18, 24],
      [7, 13, 19, 25],
      [8, 14, 20, 26],
      [9, 15, 21, 27],
      [10, 16, 22, 28],
      [11, 17, 23, 29],
      [12, 18, 24, 30],
      [13, 19, 25, 31],
      [14, 20, 26, 32],
      [15, 21, 27, 33],
      [16, 22, 28, 34],
      [17, 23, 29, 35],
      [18, 24, 30, 36],
      [19, 25, 31, 37],
      [20, 26, 32, 38],
      [21, 27, 33, 39],
      [22, 28, 34, 40],
      [23, 29, 35, 41],
    ];

    const diagonalWins = [
      [0, 7, 14, 21],
      [1, 8, 15, 22],
      [2, 9, 16, 23],
      [6, 13, 20, 27],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
      [14, 21, 28, 35],
      [18, 25, 32, 39],
      [19, 26, 33, 40],
      [20, 27, 34, 41],
      [38, 33, 28, 23],
      [37, 32, 27, 22],
      [36, 31, 26, 21],
      [30, 25, 20, 15],
      [31, 26, 21, 16],
      [32, 27, 22, 17],
      [24, 19, 14, 9],
      [25, 20, 15, 10],
      [26, 21, 16, 11],
      [18, 13, 8, 3],
      [19, 14, 9, 4],
      [20, 15, 10, 5],
    ];

    const allWins = [...colWins, ...rowWins, ...diagonalWins];

    allWins.map((win) => {
      const a = win[0];
      const b = win[1];
      const c = win[2];
      const d = win[3];
      if (
        connectFour[Math.floor(a / 6)][a % 6] ===
          connectFour[Math.floor(b / 6)][b % 6] &&
        connectFour[Math.floor(b / 6)][b % 6] ===
          connectFour[Math.floor(c / 6)][c % 6] &&
        connectFour[Math.floor(c / 6)][c % 6] ===
          connectFour[Math.floor(d / 6)][d % 6]
      ) {
        setWin(true);
        console.log("win");
        return;
      }
    });
  };

  const updateGame = () => {
    const gameState = {
      connectFour: connectFour,
      win: win,
      player: player,
      rowCounters: rowCounters,
    };
    setGame(gameState);
  };

  const uploadGame = () => {
    set(uploadAddress, game);
  };

  const downloadGame = () => {
    get(uploadAddress).then((info) => {
      setGame(info.val());
    });
  };

  useEffect(() => {
    checkWin();
    updateGame();
  }, [connectFour, win]);

  return (
    <>
      <div className="grid grid-cols-7  w-full h-full ">
        {game.connectFour.map((row, index) => (
          <div
            key={index}
            className="flex flex-col border-1 border-black 
          w-40 text-center bg-blue-600 gap-1"
          >
            <button onClick={() => dropCoin(index)}>icon</button>
            {row.map((cell, cellIndex) => (
              <h1 className=" h-25 bg-blue-400 rounded-full " key={cellIndex}>
                {cell}
              </h1>
            ))}
          </div>
        ))}
      </div>
      <button onClick={uploadGame}>Upload</button>
      <button onClick={downloadGame}>Download</button>
    </>
  );
}

export default App;
