/*
1) L'utilisateur doit pouvoir entrer un nombre entre 16 et 100 et une 
nouvelle grille de la dimension de son input doit être généré
3) L'utilisateur a un bouton pinceau qui dessine
2) L'utilisateur doit pouvoir dessiner sur les carreaux
3) L'utilisateur doit pouvoir choisir la couleur de son pinceau
4) L'utilisateur doit pouvoir effacer tout ce qu'il a fait commme dessin en un clic
5) L'utilisateur doit avoir un boutton "Gomme" qui efface
6) L'utilisateur doit pouvoir randomizer les couleurs qu'il obtient
 */



let squares16x16 = new Array();
const container = document.querySelector(".container");
const numberOfSquaresText = document.querySelector(".number-of-squares");
const userRangeChoice = document.getElementById("user-range-choice");
const userColorChoice = document.getElementById("user-color-choice");
const userEraserAll = document.getElementById("user-eraser-all");
const userEraser = document.getElementById("user-eraser");
const span = document.querySelectorAll("span")[1];
const whiteColor = "#ffffff";
let isDrawing = false;
let isErasing = false;

numberOfSquaresText.textContent = userRangeChoice.value;


function eraseAllSquares(square) {
    square.style.setProperty("background-color", whiteColor);
};

function eraseOneSquare(square) {
    userEraser.addEventListener("click", () => {
        console.log(isErasing);
        isErasing = true;
        span.textContent = "On"
        if (isErasing) {
            square.addEventListener("click", (squareEvent) => {
                squareEvent.target.style.setProperty("background-color", whiteColor);
            });
            userEraser.addEventListener("click", () => {
                span.textContent = "Off";
                isErasing = false;
            })
        }
    })
}

function drawing(squares) {
    squares.addEventListener("click", (event) => {
        isErasing = false;
        event.target.style.setProperty("background-color", userColorChoice.value)
        console.log(isErasing);
    });

    squares.addEventListener("mousedown", () => {
        isDrawing = true;
    });
    squares.addEventListener("mousemove", (event) => {
        if (isDrawing) {
            event.target.style.setProperty("background-color", userColorChoice.value)
            console.log("click pressed");
        }
    })
    squares.addEventListener("mouseup", () => {
        isDrawing = false
    })

    userColorChoice.addEventListener("click", () => {
        isErasing = false;
        console.log(isErasing);
    })

}

function create16x16Grid (grid) {

    container.innerHTML = ""; // Initialize the container every time
    userColorChoice.value = "#000000";//Starting color 


    for (let i = 0; i < grid; i++) {
        squares16x16[i] = document.createElement("div");//Assign new div element to the array objects of 16 elements
        container.append(squares16x16[i]);//Append each element
        squares16x16[i].classList.add("square16x16");//Add a style class for the new elements

        //Hover effect on squares
        squares16x16[i].addEventListener("mouseover", (event) => {
            event.target.classList.add("square16x16Hover");
        });
        squares16x16[i].addEventListener("mouseleave", (event) => {
            event.target.classList.remove("square16x16Hover");
        });

        //Erase one by one
        eraseOneSquare(squares16x16[i]);

        //Drawing effects
        drawing(squares16x16[i]);

        //Erase all
        userEraserAll.addEventListener("click", () => {
            eraseAllSquares(squares16x16[i]);
        });



    }

}


create16x16Grid(32);






userRangeChoice.addEventListener("input", (event) => {
    numberOfSquaresText.textContent = event.target.value;
    create16x16Grid(parseInt(numberOfSquaresText.textContent));
});