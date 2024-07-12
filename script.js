'use strict'

const container = document.querySelector("#container");


function createDiv(text) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.appendChild(document.createTextNode(text));
    return square;
}

function fillDivs() {
    let divs = [];

    for (let i = 0; i < 256; i++) {
        divs.push(createDiv(""));
    }

    return divs;
}

function appendDivs() {
    let divs = fillDivs();
    const docFragment = document.createDocumentFragment();

    for (let i = 0; i < divs.length; i++) {
        docFragment.appendChild(divs[i]);
    }

    container.appendChild(docFragment);
}





addEventListener("load", (e) => {
    console.log("page is loaded");
    appendDivs();
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
});
