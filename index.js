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
let userRangeChoice = document.getElementById("user-range-choice");
let userColorChoice = document.getElementById("user-color-choice");
let numberOfSquaresText = document.querySelector(".number-of-squares");
let isDrawing = false;

numberOfSquaresText.textContent = userRangeChoice.value;



function create16x16Grid (grid) {

    container.innerHTML = ""; // Initialize the container every time
    // userColorChoice.value = "#000000"


    for (let i = 0; i < grid; i++) {
        squares16x16[i] = document.createElement("div");//Assign new div element to the array objects of 16 elements
        container.append(squares16x16[i]);//Append each element
        squares16x16[i].classList.add("square16x16");//Add a style class for the new elements

        squares16x16[i].addEventListener("mouseover", (event) => {
            event.target.classList.add("square16x16Hover");
            console.log("mouseover");
        });
        squares16x16[i].addEventListener("mouseleave", (event) => {
            event.target.classList.remove("square16x16Hover");
        });
        squares16x16[i].addEventListener("click", (event) => {
            event.target.classList.add("square16x16Click");
            console.log("click black")
        })
        squares16x16[i].addEventListener("mousedown", () => {
            isDrawing = true;
        });
        squares16x16[i].addEventListener("mousemove", (event) => {
            if (isDrawing) {
                event.target.classList.add("square16x16Click");
                console.log("click pressed");
            }
        })
        squares16x16[i].addEventListener("mouseup", (event) => {
            isDrawing = false
        })


        userColorChoice.addEventListener("input", (colorEvent) => {
            squares16x16[i].addEventListener("click", (squaresEvent) => {
                console.log("click coloured")
            squaresEvent.target.style.setProperty("background-color", colorEvent.target.value);
            })
        });
        // squares16x16[i].addEventListener("click", (event) => {
        //     console.log("click");
        //     squares16x16[i].addEventListener("mousedown", (event) => {
        //         console.log("mouse enter")
        //         event.target.classList.add("square16x16Click");
        //     })
        // });

    }

}


create16x16Grid(32);

// function createGrid(numberOfSquares) {

//     container.innerHTML = ""; // Réinitialiser le conteneur

//         for (let i = 0; i < numberOfSquares; i++) {
//         let square = document.createElement("div");
//         // square.classList.add("square16x16");
//         // square.style.width = `${squareSize}%`;
//         // square.style.height = `${squareSize}vw`; // Maintenir un ratio carré
//         container.appendChild(square);
//         square.classList.add("square16x16");
//     }
// }




userRangeChoice.addEventListener("input", (event) => {
    numberOfSquaresText.textContent = event.target.value;
    // createGrid(parseInt(numberOfSquaresText.textContent))
    create16x16Grid(parseInt(numberOfSquaresText.textContent));
});