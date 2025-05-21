const fsbutton = document.getElementById('fullscreen');
const content = document.querySelector("html");

fsbutton.addEventListener("click", () => {
     if (!document.fullscreenElement) {
        if (content.requestFullscreen) {
          content.requestFullscreen();
        } else if (content.webkitRequestFullscreen) { 
          content.webkitRequestFullscreen();
        } else if (content.msRequestFullscreen) { 
          content.msRequestFullscreen();
        }
        fsbutton.innerText = "Exit Fullscreen"
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { 
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { 
          document.msExitFullscreen();
        }
        fsbutton.innerText = "Fullscreen"
      }
});

const cbutton = document.getElementById("color-button");
const colors = ["black", "white", "red", "green", "blue", "cyan", "magenta", "yellow"];
let cindex = 0;

document.getElementById("body").style.backgroundColor = "black";
cbutton.addEventListener("click", () => {
    cindex++;
    if(cindex >= colors.length) {
        cindex = 0;
    }
    document.getElementById("body").style.backgroundColor = colors[cindex];
});


const canvas = document.getElementById("tool");
const tool = canvas.getContext("2d");

tool.fillStyle = "rgb(174, 174, 174)";
tool.fillRect(0,0,canvas.width, canvas.height);

const randomDraw = () => {
    for(let i = 0; i < canvas.width; i++) {
        for(let j = 0; j < canvas.height; j++) {
            tool.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            tool.fillRect(i, j, 1, 1);
        }
    }
};

canvas.addEventListener("mousedown", loop, { once: true });

function loop() {
  randomDraw();
  requestAnimationFrame(loop);
}


let offset = 0, offsetY = 0, startX = 0, startY = 0;
canvas.addEventListener("mousedown", mouseDown);

function mouseDown(e) {
    offsetX = e.clientX - canvas.offsetLeft;
    offsetY = e.clientY - canvas.offsetTop;
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
    startX = e.clientX;
    startY = e.clientY;
    canvas.style.top = startY - offsetY + 'px';
    canvas.style.left = startX - offsetX + 'px';
}

function mouseUp(e) {
    document.removeEventListener("mousemove", mouseMove);
}




