const canvas = document.getElementById("noise-canvas");
const ctx = canvas.getContext("2d");

const width = 512;
const height = 512;

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
