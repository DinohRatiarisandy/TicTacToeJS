const gameConfig = {
   width: 500,
   height: 500,
   type: Phaser.AUTO,
   backgroundColor: "#0F0F0F",
   physics: {
      default: "arcade",
      arcade: {
         gravity: { y: 0 },
         debug: true,
      },
   },
};

export default gameConfig;
