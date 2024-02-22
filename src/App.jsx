import { useState } from "react";

import Player from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
     currentPlayer = 'O';
    }

    return currentPlayer;
}

function App() {
  //const [activePlayer, setActivePlayer] = useState('X');
  //const [hasWinneer, setHasWinner] = useState(false);

  const [players, setPlayers] = useState(
    {
      X: 'Player 1',
      O: 'Player 2',
    }
  )
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];
    for (const turn of gameTurns){
        const {square, player} = turn;
        const {row, column} = square;

        gameBoard[row][column] = player;
    }

    let winner;

    for (const combinations of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
      const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
      const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]

      if(firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        firstSquareSymbol === thirdSquareSymbol )
        {
          winner = players[firstSquareSymbol];
      }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
   // setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square : {row: rowIndex, column: colIndex }, player: currentPlayer},
        ...prevTurn,
      ];
      return updatedTurns;

    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
   setPlayers(prevPlayers => {
    return {
      ...prevPlayers,
      [symbol]: newName
    };
   });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player intitalName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player intitalName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart }/>}
        <GameBoard 
        onSelectSquare={handleSelectSquare} 
        bord={gameBoard}/>
      </div>

      <Log turns={gameTurns}/>
    </main>

    
  )
}

export default App
