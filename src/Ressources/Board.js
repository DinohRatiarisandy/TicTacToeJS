import gameConfig from "./gameConfig.js";

export default class Board {
	constructor() {
		const gridSize = 3;
		const width = gameConfig.width;

		this.state = [
			["", "", ""],
			["", "", ""],
			["", "", ""],
		];
		this.cellSize = width / gridSize;
		this.colors = {
			player: "#FFFFFF",
			cpu: "#FF0000",
		};
	}

	drawPlayer(ctx, row, col, player) {
		/**
		 * Draw on the board the current player (X or O)
		 */
		const color = player === "O" ? this.colors.player : this.colors.cpu;
		ctx.fillStyle = color;
		ctx.font = `${this.cellSize / 2}px Arial`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(
			player,
			col * this.cellSize + this.cellSize / 2,
			row * this.cellSize + this.cellSize / 2
		);
	}

	isMoveValid(row, col) {
		/**
		 * Check if the move is valid
		 * (if the board[row][col] is empty)
		 */
		return this.state[row][col] === "";
	}

	checkWinner() {
		// Check horizontals
		for (let i = 0; i < 3; i++) {
			if (
				this.state[i][0] !== "" &&
				this.state[i][0] === this.state[i][1] &&
				this.state[i][1] === this.state[i][2]
			) {
				return this.state[i][0];
			}
		}

		// Check verticals
		for (let i = 0; i < 3; i++) {
			if (
				this.state[0][i] !== "" &&
				this.state[0][i] === this.state[1][i] &&
				this.state[1][i] === this.state[2][i]
			) {
				return this.state[0][i];
			}
		}

		// Check diagonals
		if (
			this.state[0][0] !== "" &&
			this.state[0][0] === this.state[1][1] &&
			this.state[1][1] === this.state[2][2]
		) {
			return this.state[0][0];
		}

		if (
			this.state[0][2] !== "" &&
			this.state[0][2] === this.state[1][1] &&
			this.state[1][1] === this.state[2][0]
		) {
			return this.state[0][2];
		}

		if (this.isFull()) return "tie";

		return "";
	}

	isFull() {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this.state[i][j] === "") return false;
			}
		}
		return true;
	}
}
