import Phaser, { Physics } from "phaser";
import Game from "./scenes/Game";
import Lines from "./scenes/Lines";
import gameConfig from "../public/gameConfig";

const game = new Phaser.Game(gameConfig);

game.scene.add("Game", new Game());
game.scene.add("Lines", new Lines());

game.scene.start("Game");
game.scene.start("Lines");
