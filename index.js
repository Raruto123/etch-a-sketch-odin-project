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



let squares16x16 = new Array(16);
const container = document.querySelector(".container");



function create16x16Grid (grid) {

    for (let i = 0; i < grid; i++) {
        squares16x16[i] = document.createElement("div");//Assign new div element to the array objects of 16 elements
        container.append(squares16x16[i]);//Append each element
        squares16x16[i].classList.add("square16x16");//Add a style class for the new elements
        squares16x16[i].addEventListener("mouseover", (event) => {
            event.target.classList.add("square16x16Hover");
        });
        squares16x16[i].addEventListener("mouseleave", (event) => {
            event.target.classList.remove("square16x16Hover");
        })
    }
}

create16x16Grid(96)

// function createGrid(numberOfSquares) {
//     const container = document.querySelector(".container");
//     container.innerHTML = ""; // Réinitialiser le conteneur

//     const squaresPerRow = Math.ceil(Math.sqrt(numberOfSquares)); // Calculer le nombre de carrés par ligne
//     const squareSize = 100 / squaresPerRow; // Calculer la taille en pourcentage

//     for (let i = 0; i < numberOfSquares; i++) {
//         let square = document.createElement("div");
//         square.classList.add("square16x16");
//         square.style.width = `${squareSize}%`;
//         square.style.height = `${squareSize}vw`; // Maintenir un ratio carré
//         container.appendChild(square);
//     }
// }

// createGrid(200); // Exemple pour générer 32 carrés