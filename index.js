const canvas = document.getElementById("noise-canvas");
const ctx = canvas.getContext("2d");

let width = 512;
let height = 512;

canvas.width = width;
canvas.height = height;

let canvasScale = 1.0;
let animEnabled = true;
let targetRefreshRate = 8;
let interval = 1000 / targetRefreshRate;

let lastTime = 0;

function linkButton(id, click) {
    const btn = document.getElementById(id);
    btn.onclick = (e) => { click(e, btn); };
}

function linkInput(id, change) {
  const input = document.getElementById(id);
  input.onchange = (e) => { change(e, input); };
}

linkInput("inp-canvasscale", (e, t) => {
    let num = Number(t.value);

    if (typeof(num) !== "number") {
        return;
    } else if (isNaN(num)) {
        return;
    }

    if (num <= 0) {
        console.log(`someone dumb tried to scale canvas to ${num}`);
        alert("Canvas scale should be >0");
        return;
    }

    canvasScale = num;

    console.log(width, height);

    canvas.style.width = `${width * canvasScale}px`;
    canvas.style.height = `${height * canvasScale}px`;

    console.log(canvas.style.width, canvas.style.height);
});

linkInput("inp-canvaswidth", (e, t) => {
    let num = Number(t.value);

    if (typeof(num) !== "number") {
        return;
    } else if (isNaN(num)) {
        return;
    }

    if (num < 1) {
        console.log(`someone dumb tried to set canvas width to ${num}`);
        alert("Canvas width should be >=1");
        return;
    }

    width = Math.trunc(num);
    canvas.width = width;

    // Rescale canvas back
    canvas.style.width = `${width * canvasScale}px`;
    canvas.style.height = `${height * canvasScale}px`;
});

linkInput("inp-canvasheight", (e, t) => {
    let num = Number(t.value);

    if (typeof(num) !== "number") {
        return;
    } else if (isNaN(num)) {
        return;
    }

    if (num < 1) {
        console.log(`someone dumb tried to set canvas height to ${num}`);
        alert("Canvas height should be >=1");
        return;
    }

    height = Math.trunc(num);
    canvas.height = height;

    // Rescale canvas back
    canvas.style.width = `${width * canvasScale}px`;
    canvas.style.height = `${height * canvasScale}px`;
});

linkButton("btn-toggleanim", (e, t) => {
    animEnabled = !animEnabled;

    if (animEnabled) {
        t.innerHTML = "Pause";
        requestAnimationFrame(draw);
    } else {
        t.innerHTML = "Play";
    }
});

linkInput("inp-refreshrate", (e, t) => {
    let num = Number(t.value);

    if (typeof(num) !== "number") {
        return;
    } else if (isNaN(num)) {
        return;
    }

    targetRefreshRate = Math.trunc(num);
    interval = 1000 / targetRefreshRate;
    console.log(`targetRefreshRate = ${targetRefreshRate}`);
    console.log(`interval = ${interval}`);
});

requestAnimationFrame(draw);

function draw(timestamp) {
    if (!animEnabled) {
        return;
    }

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
