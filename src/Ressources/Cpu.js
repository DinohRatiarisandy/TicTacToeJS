const willWin = { 1: "X", "-1": "O", 0: "Tie" };
const scores = { X: 1, O: -1, tie: 0 };

const humanPlayer = "O";
const cpuPlayer = "X";

function CPUmove(board) {
   /**
    * The AI make its turn
    */
   let bestScore = -Infinity;
   let move;
   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         if (board.state[i][j] === "") {
            board.state[i][j] = cpuPlayer;

            let score = miniMaxAlgo(0, false, board);

            board.state[i][j] = ""; // Undo the move

            if (score > bestScore) {
               bestScore = score;
               move = { i, j };
            }
         }
      }
   }

   console.log("Who will win ? : ", willWin[String(bestScore)]);

   return move;
}

function miniMaxAlgo(depth, isMaximizing, board) {
   let result = board.checkWinner();

   if (result !== "") {
      return scores[result];
   }

   if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            if (board.state[i][j] === "") {
               board.state[i][j] = cpuPlayer;

               let score = miniMaxAlgo(depth + 1, false, board);

               board.state[i][j] = ""; // Undo the move

               bestScore = Math.max(bestScore, score);
            }
         }
      }
      return bestScore;
   } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            if (board.state[i][j] === "") {
               board.state[i][j] = humanPlayer;

               let score = miniMaxAlgo(depth + 1, true, board);

               board.state[i][j] = ""; // Undo the move

               bestScore = Math.min(bestScore, score);
            }
         }
      }
      return bestScore;
   }
}

export default CPUmove;
