const fs = require('fs');
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext("2d");

const saveLayer = async (_canvas) => {
    fs.writeFileSync("./new-gunung-01.png", _canvas.toBuffer("image/png"));
};

const drawLayer = async () => {
    const image = await loadImage('./Gunung-01.png');
    ctx.drawImage(image, 0, 0, 1000, 1000);
    saveLayer(canvas);
};

drawLayer();