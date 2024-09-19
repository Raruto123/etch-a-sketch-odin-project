let squares16x16 = new Array();
const container = document.querySelector(".container");
const numberOfSquaresText = document.querySelector(".number-of-squares");
const userRangeChoice = document.getElementById("user-range-choice");
const userColorChoice = document.getElementById("user-color-choice");
const userEraserAll = document.getElementById("user-eraser-all");
const userEraser = document.getElementById("user-eraser");
const userRandomColor = document.getElementById("user-random-color");
const whiteColor = "#ffffff";
let isDrawing = false;
let isErasing = false;
let isRandomizing = false;
// console.log(userRangeChoice.attributes);



numberOfSquaresText.textContent = userRangeChoice.value;
// numberOfSquaresText.innerHTML = "<i>lol</i>"



function eraseAllSquares(square) {
    square.style.setProperty("background-color", whiteColor);
};

// Function to erase or draw according to eraser status 
function eraseOneSquare(square) {
    // If the eraser is active, then delete
        if (isErasing) {
        square.style.setProperty("background-color", whiteColor);
    } else {
        // If the eraser is not active, draw with the chosen color
        square.style.setProperty("background-color", userColorChoice.value);
    }
};

// Function to switch between eraser and drawing
function toggleEraser() {
    isErasing = !isErasing;  // Alternate between erasing and drawing

    // Change button text to inform user of eraser status
    if (isErasing) {
        userEraser.textContent = "Disable eraser";
    } else {
        userEraser.textContent = "Enable eraser";
    }
};

function random(min, max) {
    const number = Math.floor(Math.random() * (max -min) + min);

    return number
};

function randomColor() {
    return `rgb(${random(0, 255)}, ${random(0,255)}, ${random(0, 255)})`;
};

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
        userRandomColor.textContent = "Disable random pencil";
    } else {
        userRandomColor.textContent = "Enable random pencil";
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
            // console.log("click pressed");
        }
    })
    squares.addEventListener("mouseup", () => {
        isDrawing = false
    })

}

function create16x16Grid (grid) {

    container.innerHTML = ""; // Initialize the container every time
    userColorChoice.value = "#000000";//Starting color
    console.log(isErasing, "isErasingStart");
    console.log(isRandomizing, "isRandomizingStart");
    isErasing = false;
    isRandomizing = false;
    userEraser.textContent = "Enable eraser";
    userRandomColor.textContent = "Enable random pencil";


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
}

userRandomColor.addEventListener("click", () => {
    toggleRandomColor();
    console.log(isRandomizing, "isRandomizing");
    // console.log(isErasing, "isErasing");        
    //now I have to handle the different states when isRandomizing and 
    //isErasing are both true if they are false if they are true and false 
    //etc.
    if (isRandomizing) {
        isErasing = false;
        userEraser.textContent = "Enable eraser"
        squares16x16.forEach(square => {
            square.addEventListener("click", (event) => {
                randomSquareColor(event.target); // Call the randomSquareColor function
            });
        });
    } else if (isRandomizing === false && isErasing){
        squares16x16.forEach(square => {
            square.addEventListener("click", (event) => {
                eraseOneSquare(event.target); // Call the eraseOneSquare function
            });
        });
    }
});
    // Add EventListener to activate/deactivate eraser
    userEraser.addEventListener("click", () => {
        toggleEraser();
        console.log(isErasing, "isErasing");
        // console.log(isErasing, "isErasing2");
        if(isErasing) {
            isRandomizing = false;
            userRandomColor.textContent = "Enable random pencil"
            squares16x16.forEach(square => {
                square.addEventListener("click", (event) => {
                    eraseOneSquare(event.target); // Call the eraseOneSquare function
                });
            });
        }
    });

create16x16Grid(32);






userRangeChoice.addEventListener("input", (event) => {
    numberOfSquaresText.textContent = event.target.value;
    create16x16Grid(parseInt(numberOfSquaresText.textContent));
});