"use strict";

//create canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// declare variables
let mouse = {
  x: undefined,
  y: undefined,
};
const maxRadius = 40;
const minRadius = 2;
const velocity = 3;
let circleArray = [];
let rectangleArray = [];
const colorArray = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9"];

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

/**
 * ----------------------------------------------
 *             CIRCLE ANIMATION
 * ----------------------------------------------
 */
// animate arc or circle
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.minRadius = radius;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
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

    // interactivity
    // if circle is moused over increase in size, decrease if mouse away
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius++;
      }
    } else if (this.radius > this.minRadius) {
      this.radius--;
    }

    this.draw();
  };
}

const initCircle = () => {
  circleArray = [];

  for (let i = 0; i < 800; i++) {
    const radius = Math.random() * (5 - 2) + 2;
    const x = Math.random() * (window.innerWidth - radius * 2) + radius;
    const y = Math.random() * (window.innerHeight - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * velocity;
    const dy = (Math.random() - 0.5) * velocity;
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const color = "#" + randomColor;

    circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
};

/**
 * ----------------------------------------------
 *             RECTANGLE ANIMATION
 * ----------------------------------------------
 */

function Rectangle(x, y, wx, hy, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.wx = wx;
  this.hy = hy;
  this.dx = dx;
  this.dy = dy;
  this.color = color;

  this.draw = function () {
    ctx.beginPath();

    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.wx, this.hy);
  };

  this.update = function () {
    if (this.x + this.wx > innerWidth || this.x < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.hy > innerHeight || this.y < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // //interactivity
    // if (
    //   mouse.x - this.x < 50 &&
    //   mouse.x - this.x > -50 &&
    //   mouse.y - this.y < 50 &&
    //   mouse.y - this.y > -50
    // ) {
    //   this.wx++;
    //   this.hy++;
    // } else {
    //   this.wx--;
    //   this.hy--;
    // }
    this.draw();
  };
}

const initRectangle = () => {
  for (let i = 0; i < 100; i++) {
    const wx = Math.random() * (75 - 20) + 20;
    const hy = Math.random() * (75 - 20) + 20;
    const x = Math.random() * (window.innerWidth - wx * 2) + wx;
    const y = Math.random() * (window.innerHeight - hy * 2) + hy;
    const dx = (Math.random() - 0.5) * velocity;
    const dy = (Math.random() - 0.5) * velocity;
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const color = "#" + randomColor;

    rectangleArray.push(new Rectangle(x, y, wx, hy, dx, dy, color));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  //   for (let i = 0; i < rectangleArray.length; i++) {
  //     rectangleArray[i].update();
  //   }
};

initCircle();
animate();

/**
 * ----------------------------------------------
 *             INTERACTIVITY
 * ----------------------------------------------
 */

const mouseHover = (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
};

const responsiveWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  initCircle();
};

window.addEventListener("mousemove", mouseHover);

window.addEventListener("resize", responsiveWindow);
