import Phaser from "phaser";
import Board from "../Ressources/Board";
import CPUmove from "../Ressources/CPU";

const humanPlayer = "O";
const cpuPlayer = "X";

let board = new Board();

export default class Game extends Phaser.Scene {
   constructor() {
      super({ key: "Game" });
      this.currentPlayer = humanPlayer;
   }

   create() {
      this.input.on("pointerdown", (e) => this.handleClick(e));
   }

   update() {
      const result = board.checkWinner();

      if (result === "tie") {
         console.log("No Winner !!! TIE");
         this.scene.pause();
      } else if (result !== "") {
         console.log("Winner: ", result);
         this.scene.pause();
      }

      if (this.currentPlayer == cpuPlayer && !board.isFull()) {
         const bestMove = CPUmove(board);
         board.state[bestMove.i][bestMove.j] = cpuPlayer;
         board.drawPlayer(this.scene.scene, bestMove.i, bestMove.j, cpuPlayer);
         this.changeTurn();
      }
   }

   // ========== CUSTOM METHODS ==========

   handleClick(pointer) {
      const row = Math.floor(pointer.y / board.cellSize);
      const col = Math.floor(pointer.x / board.cellSize);

      if (board.isMoveValid(row, col)) {
         board.state[row][col] = humanPlayer;
         board.drawPlayer(this.scene.scene, row, col, humanPlayer);
         this.changeTurn();
      }
   }

   changeTurn() {
      /**
       * Pass the turn to the another player
       */
      if (this.currentPlayer === humanPlayer) this.currentPlayer = cpuPlayer;
      else this.currentPlayer = humanPlayer;
   }
}
