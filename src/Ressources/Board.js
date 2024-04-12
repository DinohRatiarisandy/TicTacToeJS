import gameConfig from "../../public/gameConfig";

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
   }

   drawPlayer(scene, row, col, player) {
      /**
       * Draw on board the current player (X or O)
       */
      scene.add.text(
         col * this.cellSize + this.cellSize / 2,
         row * this.cellSize + this.cellSize / 2,
         player
      );
   }

   isMoveValid(row, col) {
      /**
       * Check if the move is valid
       * (if the board[row][col] is empty)
       */
      if (this.state[row][col] === "") return true;
      else return false;
   }

   checkWinner() {
      // In horizontals
      if (
         this.state[0][0] !== "" &&
         this.state[0][0] === this.state[0][1] &&
         this.state[0][1] === this.state[0][2]
      )
         return this.state[0][0];

      if (
         this.state[1][0] !== "" &&
         this.state[1][0] === this.state[1][1] &&
         this.state[1][1] === this.state[1][2]
      )
         return this.state[1][0];

      if (
         this.state[2][0] !== "" &&
         this.state[2][0] === this.state[2][1] &&
         this.state[2][1] === this.state[2][2]
      )
         return this.state[2][0];

      // In verticals
      if (
         this.state[0][0] !== "" &&
         this.state[0][0] === this.state[1][0] &&
         this.state[1][0] === this.state[2][0]
      )
         return this.state[0][0];

      if (
         this.state[0][1] !== "" &&
         this.state[0][1] === this.state[1][1] &&
         this.state[1][1] === this.state[2][1]
      )
         return this.state[0][1];

      if (
         this.state[0][2] !== "" &&
         this.state[0][2] === this.state[1][2] &&
         this.state[1][2] === this.state[2][2]
      )
         return this.state[0][2];

      // // In diagonals
      if (
         this.state[0][0] !== "" &&
         this.state[0][0] === this.state[1][1] &&
         this.state[1][1] === this.state[2][2]
      )
         return this.state[0][0];

      if (
         this.state[0][2] !== "" &&
         this.state[0][2] === this.state[1][1] &&
         this.state[1][1] === this.state[2][0]
      )
         return this.state[0][2];

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
