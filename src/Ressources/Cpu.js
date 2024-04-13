const willWin = { 1: "X", "-1": "O", 0: "Tie" };
const scores = { X: 1, O: -1, tie: 0 };

const humanPlayer = "O";
const cpuPlayer = "X";

function CPUmove(board) {
   /**
    * The AI make its turn
    */
   let bestScore = -Infinity;
   let alpha = -Infinity;
   let beta = Infinity;
   let move;

   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         if (board.state[i][j] === "") {
            board.state[i][j] = cpuPlayer;

            let score = miniMaxAlphaBeta(0, false, board, alpha, beta);

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

function miniMaxAlphaBeta(depth, isMaximizing, board, alpha, beta) {
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

               let score = miniMaxAlphaBeta(
                  depth + 1,
                  false,
                  board,
                  alpha,
                  beta
               );

               board.state[i][j] = ""; // Undo the move

               bestScore = Math.max(bestScore, score);

               alpha = Math.max(alpha, score);
               if (beta <= alpha) break;
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

               let score = miniMaxAlphaBeta(
                  depth + 1,
                  true,
                  board,
                  alpha,
                  beta
               );

               board.state[i][j] = ""; // Undo the move

               bestScore = Math.min(bestScore, score);

               beta = Math.min(beta, score);
               if (beta <= alpha) break;
            }
         }
      }
      return bestScore;
   }
}

export default CPUmove;
