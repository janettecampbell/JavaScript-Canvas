"use strict";

//create canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// draw rectangles on canvas
// ctx.fillRect(x, y, width, height)
ctx.fillRect(100, 100, 100, 100);
ctx.fillRect(400, 100, 100, 100);
ctx.fillRect(300, 300, 100, 100);
