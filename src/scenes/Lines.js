import gameConfig from "../Ressources/gameConfig.js";

const width = gameConfig.width;
const height = gameConfig.height;

export default class Lines {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = width;
		this.canvas.height = height;
	}

	create() {
		this.ctx.strokeStyle = "#4d4d4dce";
		this.ctx.lineWidth = 3;

		// Vertical lines
		this.drawLine(width / 3, 0, width / 3, height);
		this.drawLine((width / 3) * 2, 0, (width / 3) * 2, height);

		// Horizontal lines
		this.drawLine(0, height / 3, width, height / 3);
		this.drawLine(0, (height / 3) * 2, width, (height / 3) * 2);
	}

	drawLine(x1, y1, x2, y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}
}
