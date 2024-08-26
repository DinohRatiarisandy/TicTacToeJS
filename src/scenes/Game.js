import Board from "../Ressources/Board.js";
import CPUmove from "../Ressources/Cpu.js";
import Lines from "./Lines.js";

const humanPlayer = "O";
const cpuPlayer = "X";

export default class Game {
	constructor() {
		this.canvas = document.getElementById("gameCanvas");
		this.restartBtn = document.querySelector(".restartBtn");
		this.ctx = this.canvas.getContext("2d");
		this.currentPlayer = humanPlayer; // Set the initial player (human player)
		this.board = new Board();
		this.resultTxt = document.getElementById("Result");

		// Bind methods to maintain context
		this.handleClick = this.handleClick.bind(this);
		this.stopGame = this.stopGame.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
		this.isRunning = true;
	}

	start() {
		// Draw the grid
		this.lines = new Lines("gameCanvas");
		this.lines.create();

		// Add event listeners
		this.addEventListeners();
	}

	addEventListeners() {
		// Add event listeners for user input
		this.canvas.addEventListener("click", this.handleClick);

		// Add event listeners for restart button
		this.restartBtn.addEventListener("click", this.handleRestart);
	}

	removeEventListeners() {
		// Remove event listeners
		this.canvas.removeEventListener("click", this.handleClick);
	}

	handleRestart() {
		// Reset the game state
		this.board = new Board(); // Reset the board
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
		this.lines.create(); // Redraw the grid

		// Reset game variables
		this.currentPlayer = humanPlayer;
		this.resultTxt.textContent = ""; // Clear result message
		this.isRunning = true; // Enable game play

		// Re-add event listeners
		this.addEventListeners();
	}

	handleClick(event) {
		if (!this.isRunning) return; // Ignore clicks if the game is not running

		const rect = this.canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const row = Math.floor(y / this.board.cellSize);
		const col = Math.floor(x / this.board.cellSize);

		if (this.board.isMoveValid(row, col)) {
			this.board.state[row][col] = this.currentPlayer;
			this.board.drawPlayer(this.ctx, row, col, this.currentPlayer);
			this.checkResult();
			this.changeTurn();
		}

		if (this.currentPlayer === cpuPlayer && this.isRunning) {
			const { i, j } = CPUmove(this.board, Infinity);
			if (this.board.isMoveValid(i, j)) {
				this.board.state[i][j] = this.currentPlayer;
				this.board.drawPlayer(this.ctx, i, j, this.currentPlayer);
				this.checkResult();
				this.changeTurn();
			}
		}
	}

	checkResult() {
		const result = this.board.checkWinner();
		if (result !== "") {
			this.stopGame();
			if (result === "tie") {
				this.resultTxt.textContent = "No winner! TIE";
			} else if (result !== "") {
				if (result === "O") this.resultTxt.textContent = "You Win!";
				else this.resultTxt.textContent = "You Lose, CPU Wins!";
			}
		}
	}

	changeTurn() {
		this.currentPlayer =
			this.currentPlayer === humanPlayer ? cpuPlayer : humanPlayer;
	}

	stopGame() {
		this.removeEventListeners();
		this.isRunning = false;
	}
}
