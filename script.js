'use strict'




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
    const container = document.querySelector("#container");
    const button = document.querySelector(".btn");
    const clear = document.querySelector(".clear");
    const range = document.querySelector(".range");
    const rangeText = document.querySelector(".gigaText");

    console.log("page is loaded");
    initializeDivs();


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
                    square.style.setProperty("--grid_opacity", opacity);
                    current = parseFloat(opacity);
                }
            })
            square.addEventListener("mousedown", (e) => {
                if (current < 1 && e.buttons === 1) {
                    const opacity = (current + 1).toFixed(1);
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

    randomizeRGB();
    divHover();

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
                randomizeRGB();
                el = el.nextSibling;
            } else {
                el.style.setProperty("--grid_opacity", 0);
                randomizeRGB();
                el = el.nextSibling;
            }
            i++;
        }
        divHover();
    });
});


