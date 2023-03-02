import { useState } from 'react';
import './App.css';

const moves = ['rock', 'paper', 'scissors'];
function determineWinner(playerMove: number, computersMove: number): number {
	// 1 player/first wins, -1 computer/second wins, 0 is a tie
	if (playerMove === computersMove) return 0;

	if (playerMove === 0) {
		if (computersMove === 2) {
			return 1;
		} else {
			return -1;
		}
	} else if (playerMove === 1) {
		if (computersMove === 0) {
			return 1;
		} else {
			return -1;
		}
	} else {
		if (computersMove === 1) {
			return 1;
		} else {
			return -1;
		}
	}
}
function randomMove(): number {
	return Math.floor(Math.random() * 3);
}

function App() {
	const [round, setRound] = useState(0);
	const [playerScore, setPlayerScore] = useState(0);
	const [computerScore, setComputersScore] = useState(0);
	const [winner, setWinner] = useState('');
	const [computersMove, setComputersMove] = useState('');
	const [playersMove, setPlayerMove] = useState('');

	function handleMove(playerMove: number) {
		const computersNewMove = randomMove();
		const nextWinner = determineWinner(playerMove, computersNewMove);

		if (nextWinner === 1) {
			setPlayerScore(playerScore + 1);
		} else if (nextWinner === -1) {
			setComputersScore(computerScore + 1);
		}

		setPlayerMove(moves[playerMove]);
		setWinner(nextWinner === 0 ? 'Tie' : nextWinner === 1 ? 'Player' : 'Computer');
		setRound(round + 1);
		setComputersMove(moves[computersNewMove]);
	}
	function handleReset() {
		setRound(0);
		setPlayerScore(0);
		setComputersScore(0);
		setPlayerMove('');
		setComputersMove('');
	}

	return (
		<div className="App">
			<header>
				<h1>Reactive Rock Paper Scissors</h1>
			</header>
			<div>round: {round}</div>
			<div className="controls">
				{moves.map((move, idx) => {
					return (
						<button key={move} onClick={() => handleMove(idx)}>
							{move}
						</button>
					);
				})}
			</div>
			<div>player score: {playerScore}</div>
			<div>computer score: {computerScore}</div>
			<div>Winner: {winner}</div>
			<button onClick={handleReset}>Reset</button>
			<div>Players Move: {playersMove}</div>
			<div>Computers Move: {computersMove}</div>
		</div>
	);
}

export default App;
