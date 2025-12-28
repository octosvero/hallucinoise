const canvas = document.getElementById("noise-canvas");
const ctx = canvas.getContext("2d");

const width = 512;
const height = 512;

const targetRefreshRate = 8;
const interval = 1000 / targetRefreshRate;

let lastTime = 0;

requestAnimationFrame(draw);

function draw(timestamp) {
    if (timestamp - lastTime >= interval) {
        ctx.putImageData(generateNoise(width, height), 0, 0);
        lastTime = timestamp;
    }
    requestAnimationFrame(draw);
}

function generateNoise(width, height) {
    const imageData = new ImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const color = Math.floor(Math.random() * 255);
    
        imageData.data[i] = color;
        imageData.data[i + 1] = color;
        imageData.data[i + 2] = color;
        imageData.data[i + 3] = 255;
    }

    return imageData;
}