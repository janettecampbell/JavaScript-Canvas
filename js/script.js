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
const velocity = 3;
const maxRectangleHeight = 40;
const maxRectangleWidth = 40;
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
function Circle(x, y, dx, dy, radius) {
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

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
};

/**
 * ----------------------------------------------
 *             RECTANGLE ANIMATION
 * ----------------------------------------------
 */

function Rectangle(x, y, width, height, dx, dy) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.dx = dx;
  this.dy = dy;
  this.minRectangleWidth = width;
  this.minRectangleHeight = height;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.update = function () {
    if (this.x + this.width > innerWidth || this.x < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.height > innerHeight || this.y < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    // if rectangle is moused over increase in size, decrease if mouse away
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.height < maxRectangleHeight && this.width < maxRectangleWidth) {
        this.width++;
        this.height++;
      }
    } else if (
      this.width > this.minRectangleWidth &&
      this.height > this.minRectangleHeight
    ) {
      this.width--;
      this.height--;
    }
    this.draw();
  };
}

const initRectangle = () => {
  rectangleArray = [];

  for (let i = 0; i < 800; i++) {
    const width = Math.random() * (5 - 2) + 2;
    const height = Math.random() * (5 - 2) + 2;
    const x = Math.random() * (window.innerWidth - width * 2) + width;
    const y = Math.random() * (window.innerHeight - height * 2) + height;
    const dx = (Math.random() - 0.5) * velocity;
    const dy = (Math.random() - 0.5) * velocity;
    rectangleArray.push(new Rectangle(x, y, width, height, dx, dy));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  // circle animation
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  // rectangle animation
  //   for (let i = 0; i < rectangleArray.length; i++) {
  //     rectangleArray[i].update();
  //   }
};

initCircle();
initRectangle();
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
