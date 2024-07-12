'use strict'

const container = document.querySelector("#container");
const button = document.querySelector(".btn");
const clear = document.querySelector(".clear");
const rainbow = document.querySelector(".rainbow");
const black = document.querySelector(".black");
const eraser = document.querySelector(".eraser");
const range = document.querySelector(".range");
const rangeText = document.querySelector(".gigaText");
const rainbowClass = rainbow.classList;
const blackClass = black.classList;
const eraserClass = eraser.classList;

let squares;
let defaultGrid = 16;
let drawType = "draw";

range.addEventListener("input", () => {
    rangeText.textContent = `Grid Size: ${range.value}x${range.value}`;
});

button.addEventListener("click", () => {
    squares.forEach(square => {
        square.remove();
    })
    drawDivs(range.value);
});

clear.addEventListener("click", () => {
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
    });
});

rainbow.addEventListener("click", () => {
    if (blackClass.contains("active") || eraserClass.contains("active")) {
        rainbowClass.add("active");
        eraserClass.remove("active");
        blackClass.remove("active");
        drawType = "rainbow";
    }
});

black.addEventListener("click", () => {
    if (rainbowClass.contains("active") || eraserClass.contains("active")) {
        blackClass.add("active");
        eraserClass.remove("active");
        rainbowClass.remove("active");
        drawType =  "draw";
    }
    
});

eraser.addEventListener("click", () => {
    if (rainbowClass.contains("active") || blackClass.contains("active")) {
        eraserClass.add("active");
        blackClass.remove("active");
        rainbowClass.remove("active");
        drawType = "eraser";
    }
})

function drawDivs(input) {
    let squareSize = 600 / input;

    for (let i = 0; i < (input*input); i++) {

        const square = document.createElement("div");
        square.classList.add("square");

        square.addEventListener("mousedown", draw);
        square.addEventListener("mouseenter", draw);

        square.style.flex = `1 0 ${squareSize}px`;
        square.style.backgroundColor = 'white';
        square.style.maxHeight = squareSize;

        container.appendChild(square);
    };
    squares = document.querySelectorAll(".square");
}

function draw(e) {
    let color;
    switch(drawType) {
        case "draw": 
            color = "black";
            break;
        case "eraser":
            color = "white";
            break;
        case "rainbow":
            color = `rgb(
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)})`;
            break;
        default:
            color = drawType;
            break;
    }

    e.preventDefault();
    if (e.buttons === 1) {
        e.target.style.backgroundColor = color;
        return;
    }
}



addEventListener("load", () => {
    console.log("page is loaded");
    black.classList.add("active");
    drawDivs(defaultGrid);
});


