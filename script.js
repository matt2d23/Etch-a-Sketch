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

function initializeDivs() {
    let divs = fillDivs(256);
    const docFragment = document.createDocumentFragment();

    for (let i = 0; i < divs.length; i++) {
        docFragment.appendChild(divs[i]);
    }

    container.appendChild(docFragment);
}

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
            square.addEventListener("mouseover", (e) => {
                square.classList.add("mouseHover");
                square.addEventListener("mouseout", (e) => {
                    square.classList.remove("mouseHover");
                })
            })
        })
    }
    divHover();


    button.addEventListener("click", () => {
        let answer = +prompt("Enter a number to reform the grid (Maximum value 100)");
        let answerSquared = answer * answer;
        console.log(answer);
        if (answer > 100) {
            alert("Please enter a value lower than 100");
        } else if (answer == false || answer === null) {
            alert("Canceled");
        } else {
            appendDivs(answerSquared);
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
        }
    })
});
