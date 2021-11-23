let canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext('2d');
let prevX = null;
let prevY = null;
let draw = false;
let button = 'pencil';
window.addEventListener('mousemove', (e) => {
    if (prevX == null || prevY == null || draw == false) {
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }
    let currX = e.clientX;
    let currY = e.clientY;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    prevX = currX;
    prevY = currY;
});
window.addEventListener('mousedown', (e) => { draw = true; });
window.addEventListener('mouseup', (e) => { draw = false; });
let lwidth = document.getElementById("lineWidth");
lwidth.onchange = function () {
    ctx.lineWidth = lwidth.value;
};
let lcolor = document.getElementById("lineColor");
lcolor.onchange = function () {
    if (button == 'pencil')
        ctx.strokeStyle = lcolor.value;
};
let clearBtn = document.getElementById("clearbtn");
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
let saveBtn = document.getElementById("savebtn");
saveBtn.addEventListener('click', () => {
    let data = canvas.toDataURL("imag/png");
    let a = document.createElement('a');
    a.href = data;
    a.download = "myCanvas.png";
    a.click();
});
let drawBtn = document.getElementById('pencil');
drawBtn.addEventListener('click', () => {
    button = 'pencil';
    ctx.strokeStyle = lcolor.value;
    if (drawBtn.classList.contains('btn-danger')) {
        drawBtn.classList.remove('btn-danger');
        drawBtn.classList.add('btn-success');
        eraserBtn.classList.remove('btn-success');
        eraserBtn.classList.add('btn-danger');
    }
});
let eraserBtn = document.getElementById('eraser');
eraserBtn.addEventListener('click', () => {
    button = 'eraser';
    ctx.strokeStyle = "#fff";
    if (eraserBtn.classList.contains('btn-danger')) {
        eraserBtn.classList.remove('btn-danger');
        eraserBtn.classList.add('btn-success');
        drawBtn.classList.remove('btn-success');
        drawBtn.classList.add('btn-danger');
    }
});