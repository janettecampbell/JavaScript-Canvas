"use strict";

//create canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// // draw rectangles on canvas
// // ctx.fillRect(x, y, width, height)
// ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = "rgba(0, 0, 255, 0.5";
// ctx.fillRect(400, 100, 100, 100);
// ctx.fillStyle = "rgba(0, 255, 0, 0.5";
// ctx.fillRect(300, 300, 100, 100);

// // lines
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = "#fa34a3";
// ctx.stroke();

// // arc or circle
// ctx.beginPath();
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = "red";
// ctx.stroke();

// for (let i = 0; i < 100; i++) {
//   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   ctx.beginPath();
//   ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//   ctx.strokeStyle = "#" + randomColor;
//   ctx.stroke();
// }

// animate arc or circle
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

let circleArray = [];

for (let i = 0; i < 100; i++) {
  const radius = 30;
  let x = Math.random() * (window.innerWidth - radius * 2) + radius;
  let y = Math.random() * (window.innerHeight - radius * 2) + radius;
  let dx = Math.random() - 0.5 * 8;
  let dy = Math.random() - 0.5 * 8;
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const color = "#" + randomColor;

  circleArray.push(new Circle(x, y, dx, dy, radius, color));
}

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
};

animate();
