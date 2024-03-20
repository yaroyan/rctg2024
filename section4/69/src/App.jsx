import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

function deriveActivePlayer(gameTurns) {
  return 0 < gameTurns.length && gameTurns[0].player === 'X' ? 'O' : 'X';
}

function deriveWinner(gameBoard, players) {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    const isEnd = firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol;
    if (isEnd) {
      return players[firstSquareSymbol];
    }
  }
  return undefined;
}

function reflectStateOnBoard(turns, board) {
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(e => [...e])];
  reflectStateOnBoard(gameTurns, gameBoard);
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = !winner && gameTurns.length === 9;
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]
      return updatedTurns;
    });
  }
  const handleRestart = () => {
    setGameTurns([]);
  }
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
