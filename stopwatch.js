const display = document.getElementById("display");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const laps = document.getElementById("laps");
const list = document.getElementById("child");

let hr = 0;
let min = 0;
let sec = 0;
let mili = 0;

let timer = null;
let lapCount = 1;

// Update Stopwatch Display
function updateTimer() {
    const h = hr < 10 ? "0" + hr : hr;
    const m = min < 10 ? "0" + min : min;
    const s = sec < 10 ? "0" + sec : sec;
    const ms = mili < 10 ? "0" + mili : mili;

    display.innerText = `${h}:${m}:${s}:${ms}`;
}

// Start
start.addEventListener("click", () => {
    if (timer !== null) return;

    timer = setInterval(() => {
        mili++;

        if (mili === 100) {
            mili = 0;
            sec++;
        }

        if (sec === 60) {
            sec = 0;
            min++;
        }

        if (min === 60) {
            min = 0;
            hr++;
        }

        updateTimer();
    }, 10);
});

// Stop
stop.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

// Reset
reset.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;

    hr = 0;
    min = 0;
    sec = 0;
    mili = 0;

    lapCount = 1;
    list.innerHTML = "";

    updateTimer();
});

// Lap
laps.addEventListener("click", () => {

    if (timer === null) return;

    const h = hr < 10 ? "0" + hr : hr;
    const m = min < 10 ? "0" + min : min;
    const s = sec < 10 ? "0" + sec : sec;
    const ms = mili < 10 ? "0" + mili : mili;

    const lap = document.createElement("p");
    lap.innerText = `Lap ${lapCount}: ${h}:${m}:${s}:${ms}`;

    list.appendChild(lap);

    lapCount++;
});

// Show initial value
updateTimer();