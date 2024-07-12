'use strict'

const container = document.querySelector("#container");
const button = document.querySelector(".btn");


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

    function divHover() {
        const getSquare = document.querySelectorAll(".square");
        getSquare.forEach((square) => {
            let current = 
                parseFloat(window.getComputedStyle(square).getPropertyValue("--grid_opacity")
            );
            square.addEventListener("mouseover", () => {
                if (getSquare.length >= 4096) {
                    if (current > 0) {
                        const opacity = (current - 1).toFixed(1);
                        square.style.setProperty("--grid_opacity", opacity);
                        current = parseFloat(opacity);
                    }
                } else {
                    if (current > 0) {
                        const opacity = (current - 0.2).toFixed(1);
                        square.style.setProperty("--grid_opacity", opacity);
                        current = parseFloat(opacity);
                    }
                }
                
            });
        });
    }

    function randomizeRGB() {
        let el = container.firstChild;
        let i = 0;
        while (i < container.childNodes.length) {
            if (el === container.firstChild) {
                el.style.backgroundColor = `rgb(
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)})`
                el = el.nextSibling;
            } else {
                el.style.backgroundColor = `rgb(
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)})`
                el = el.nextSibling;
            }
            i++;
        }
    }

    randomizeRGB();
    divHover();

    button.addEventListener("click", () => {
        let answer = +prompt("Enter a number to reform the grid (Maximum value 100)");
        let answerSquared = answer * answer;
        if (answer > 100) {
            alert("Please enter a value lower than or equal to 100.");
        } else if (answer == false || answer === null) {
            alert("Canceled");
        } else if (answer > 0 && answer <= 100) {
            appendDivs(answerSquared);
            randomizeRGB();
            divHover();
            let el = container.firstChild;
            let i = 0;
            while (i < container.childNodes.length) {
                if (el === container.firstChild) {
                    el.style.width = `calc(720px / ${answer})`
                    el = el.nextSibling;
                } else {
                    el.style.width = `calc(720px / ${answer})`
                    el = el.nextSibling;
                }
                i++;
            }
        } else {
            alert("Please enter a number");
        }
    })
});
