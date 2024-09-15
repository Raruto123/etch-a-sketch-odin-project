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
const userRandomColor = document.getElementById("user-random-color");
const whiteColor = "#ffffff";
let isDrawing = false;
let isErasing = false;
let isRandomizing = false;

numberOfSquaresText.textContent = userRangeChoice.value;
span.textContent = "Off";


function eraseAllSquares(square) {
    square.style.setProperty("background-color", whiteColor);
};

// Fonction pour gommer ou dessiner en fonction de l'état de la gomme
function eraseOneSquare(square) {
    // Si la gomme est active, alors on efface
    if (isErasing) {
        square.style.setProperty("background-color", whiteColor);
    } else {
        // Si la gomme n'est pas active, on dessine avec la couleur choisie
        square.style.setProperty("background-color", userColorChoice.value);
    }
}

// Fonction pour basculer entre gomme et dessin
function toggleEraser() {
    isErasing = !isErasing;  // Alterner entre gommer et dessiner

    // Changer le texte du bouton pour indiquer à l'utilisateur l'état de la gomme
    if (isErasing) {
        userEraser.textContent = "Désactiver la gomme";
    } else {
        userEraser.textContent = "Activer la gomme";
    }
}

function random(min, max) {
    const number = Math.floor(Math.random() * (max -min) + min);

    return number
}

function randomColor() {
    return `rgb(${random(0, 255)}, ${random(0,255)}, ${random(0, 255)})`
}

function setRandomBgColor(square) {
    const newRandomBgColor = randomColor();
    square.style.setProperty("background-color", newRandomBgColor)
}

function randomSquareColor(square) {

    if (isRandomizing) {
        setRandomBgColor(square)
    } else {
        square.style.setProperty("background-color", userColorChoice.value)
    }
}

function toggleRandomColor() {
    isRandomizing = !isRandomizing;

    if (isRandomizing) {
        userRandomColor.textContent = "Désactiver couleur aléatoire";
    } else {
        userRandomColor.textContent = "Activer couleur aléatoire";
    }
}


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
        });
        squares16x16[i].addEventListener("mouseleave", (event) => {
            event.target.classList.remove("square16x16Hover");
        });

        //Drawing effects
        drawing(squares16x16[i]);

        //Erase all
        userEraserAll.addEventListener("click", () => {
            eraseAllSquares(squares16x16[i]);
        });

    }

    userRandomColor.addEventListener("click", () => {
        toggleRandomColor();
        console.log(isErasing)
        //je dois gérer maintenant les différents états lorsque isRandomizing et isErasing sont tous les deux vrais s'ils sont faux s'ils sont vrais et faux etc.
        if (isRandomizing) {
            squares16x16.forEach(square => {
                square.addEventListener("click", (event) => {
                    randomSquareColor(event.target); // Appel à la fonction eraseOneSquare
                });
            });
        }
    });
        // Ajout de l'EventListener pour dessiner ou effacer en fonction de l'état de la gomme

        // Ajout de l'EventListener pour activer/désactiver la gomme
        userEraser.addEventListener("click", () => {
            toggleEraser();
            console.log(isErasing);
            if(isErasing) {
                squares16x16.forEach(square => {
                    square.addEventListener("click", (event) => {
                        eraseOneSquare(event.target); // Appel à la fonction eraseOneSquare
                    });
                });
            }
        });



}


create16x16Grid(32);






userRangeChoice.addEventListener("input", (event) => {
    numberOfSquaresText.textContent = event.target.value;
    create16x16Grid(parseInt(numberOfSquaresText.textContent));
});