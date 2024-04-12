import Phaser from "phaser";
import gameConfig from "../../public/gameConfig";

const width = gameConfig.width;
const height = gameConfig.height;

export default class Lines extends Phaser.Scene {
   constructor() {
      super({ key: "Lines" });
   }

   create() {
      const graphics = this.add.graphics();

      graphics.lineStyle(2, 0xfefefe);

      // Verticals lines
      graphics.lineBetween(width / 3, 0, width / 3, height);
      graphics.lineBetween((width / 3) * 2, 0, (width / 3) * 2, height);

      // Horizontals lines
      graphics.lineBetween(0, height / 3, width, height / 3);
      graphics.lineBetween(0, (height / 3) * 2, width, (height / 3) * 2);
   }
}
