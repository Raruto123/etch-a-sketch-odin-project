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
const userRangeChoice = document.getElementById("user-range-choice");
const userColorChoice = document.getElementById("user-color-choice");
const numberOfSquaresText = document.querySelector(".number-of-squares");
const userEraser = document.getElementById("user-eraser");
let isDrawing = false;


function eraseSquares() {
    container.innerHTML = "";
};

userEraser.addEventListener("input", () => {
    eraseSquares();
});

numberOfSquaresText.textContent = userRangeChoice.value;

function drawing(squares) {
    squares.addEventListener("click", (event) => {
        event.target.style.setProperty("background-color", userColorChoice.value)
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
            console.log("mouseover");
        });
        squares16x16[i].addEventListener("mouseleave", (event) => {
            event.target.classList.remove("square16x16Hover");
        });

        //Drawing effects
        drawing(squares16x16[i]);

    }

}


create16x16Grid(32);






userRangeChoice.addEventListener("input", (event) => {
    numberOfSquaresText.textContent = event.target.value;
    create16x16Grid(parseInt(numberOfSquaresText.textContent));
});