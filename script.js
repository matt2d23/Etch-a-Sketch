'use strict'

const container = document.querySelector("#container");
const button = document.querySelector(".btn");
const clear = document.querySelector(".clear");
const rainbow = document.querySelector(".rainbow");
const customColor = document.querySelector(".setColor");
const range = document.querySelector(".range");
const rangeText = document.querySelector(".gigaText");
const rainbowClasses = rainbow.classList;
const customColorClass = customColor.classList;

range.addEventListener("input", (e) => {
    rangeText.textContent = `Grid Size: ${range.value}x${range.value}`;
})

function divHover() {
    const getSquare = document.querySelectorAll(".square");
    getSquare.forEach((square) => {
        let current = 
            parseFloat(window.getComputedStyle(square).getPropertyValue("--grid_opacity")
        );
        square.addEventListener("mouseover", (e) => {
            if (current < 1 && e.buttons === 1) {
                const opacity = (current + 1).toFixed(1);
                const rgb = `rgb(
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)})`
                square.style.setProperty("background-color", rgb);
                square.style.setProperty("--grid_opacity", opacity);
                current = parseFloat(opacity);
            }
        })
        square.addEventListener("mousedown", (e) => {
            if (current < 1 && e.buttons === 1) {
                const opacity = (current + 1).toFixed(1);
                const rgb = `rgb(
                    ${Math.floor(Math.random() * 256)},
                    ${Math.floor(Math.random() * 256)},
                    ${Math.floor(Math.random() * 256)})`
                square.style.setProperty("background-color", rgb);
                square.style.setProperty("--grid_opacity", opacity);
                current = parseFloat(opacity);
            }
        })
    });
}

function randomizeRGB() {
    let el = container.firstChild;
    let i = 0;
    while (i < container.childNodes.length) {
        if (el === container.firstChild) {
            el.style.backgroundColor = `rgb(
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)})`
            el = el.nextSibling;
        } else {
            el.style.backgroundColor = `rgb(
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)})`
            el = el.nextSibling;
        }
        i++;
    }
}

function setColor() {
    let el = container.firstChild;
    let i = 0;
    while (i < container.childNodes.length) {
        if (el === container.firstChild) {
            el.style.backgroundColor = 'black';
            el = el.nextSibling;
        } else {
            el.style.backgroundColor = 'black';
            el = el.nextSibling;
        }
        i++;
    }
}


function createDiv(text) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.appendChild(document.createTextNode(text));
    return square;
}

function fillDivs(input) {
    let divs = [];

    for (let i = 0; i < input; i++) {
        divs.push(createDiv(""));
    }

    return divs;
}

// When this is called on page load, the pad is created by default at a size of 16x16 squares.
function initializeDivs() {
    let divs = fillDivs(256);
    const docFragment = document.createDocumentFragment();

    for (let i = 0; i < divs.length; i++) {
        docFragment.appendChild(divs[i]);
    }

    container.appendChild(docFragment);
}

// Same function as above, but for when the user inputs a new size.
function appendDivs(input) {
    removeDivs();
    let divs = fillDivs(input);
    const docFragment = document.createDocumentFragment();

    for (let i = 0; i < divs.length; i++) {
        docFragment.appendChild(divs[i]);
    }

    container.appendChild(docFragment);
}

function removeDivs() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}





addEventListener("load", (e) => {
    

    console.log("page is loaded");
    initializeDivs();
    setColor();
    divHover();
    customColorClass.toggle("active");

    button.addEventListener("click", () => {
        // let answer = +prompt("Enter a number to reform the grid (Maximum value 100)");
        let answer = range.value;
        let answerSquared = answer * answer;

        appendDivs(answerSquared);
        randomizeRGB();
        divHover();
        let el = container.firstChild;
        let i = 0;
        while (i < container.childNodes.length) {
            if (el === container.firstChild) {
                el.style.width = `calc(600px / ${answer})`
                el = el.nextSibling;
            } else {
                el.style.width = `calc(600px / ${answer})`
                el = el.nextSibling;
            }
            i++;
        }
    })

    clear.addEventListener("click", () => {
        let el = container.firstChild;
        let i = 0;
        while (i < container.childNodes.length) {
            if (el === container.firstChild) {
                el.style.setProperty("--grid_opacity", 0);
                el.style.backgroundColor = `rgb(
                    ${Math.floor(Math.random() * 256)},
                    ${Math.floor(Math.random() * 256)},
                    ${Math.floor(Math.random() * 256)})`
                el = el.nextSibling;
            } else {
                el.style.setProperty("--grid_opacity", 0);
                el.style.backgroundColor = `rgb(
                    ${Math.floor(Math.random() * 256)},
                    ${Math.floor(Math.random() * 256)},
                    ${Math.floor(Math.random() * 256)})`
                el = el.nextSibling;
            }
            i++;
        }
        divHover();
    });

    rainbow.addEventListener("click", () => {
        if (customColorClass.contains("active") && !rainbowClasses.contains("active")) {
            customColorClass.toggle("active");
            rainbowClasses.toggle("active");
        } else if (!rainbowClasses.contains("active")) {
            rainbowClasses.toggle("active");
        }
        
    })

    customColor.addEventListener("click", () => {
        if (rainbowClasses.contains("active") && !customColorClass.contains("active")) {
            rainbowClasses.toggle("active");
            customColorClass.toggle("active");
        } else if (!customColorClass.contains("active")){
            customColorClass.toggle("active");
        }
    })
});


