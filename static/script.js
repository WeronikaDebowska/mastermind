var numberOfRowsCompleted = 0;
var guessing = [0,0,0,0]
var code = [1,2,4,6]
activateRow(1)

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    var idOfPegDragged = ev.dataTransfer.getData("text");
    var img = new Image();
    switch (idOfPegDragged){
        case "A":
            img.src = "static/pegs/red.png"; 
            break;
        case "B":
            img.src = "static/pegs/orange.png"; 
            break;
        case "C":
            img.src = "static/pegs/yellow.png"; 
            break;
        case "D":
            img.src = "static/pegs/green.png"; 
            break;
        case "E":
            img.src = "static/pegs/blue.png"; 
            break;
        case "F":
            img.src = "static/pegs/purple.png"; 
            break;
    }
    ev.dataTransfer.setDragImage(img, 24, 24);
}

function drop(ev) {
    ev.preventDefault();

    var idOfPegDragged = ev.dataTransfer.getData("text");  //dragged pegs
    var pegDragged = document.getElementById(idOfPegDragged);
    var colorDragged = pegDragged.style.color;
    
    var guess = ev.target;  //state after peg drop
    guess.style.color = colorDragged;
    guess.className = "fas fa-circle fa-3x";
    
    var index = Number(guess.id.slice(-1))-1;
    guessing[index] = idOfPegDragged;
    checkStatus()
}

function checkStatus() {
    if (guessing.includes(0) == false){
        numberOfRowsCompleted += 1;
        let numberOfrowToActivate = numberOfRowsCompleted + 1;
        activateRow(numberOfrowToActivate);
        if (numberOfRowsCompleted > 0){
            deactivateRow(numberOfRowsCompleted);
        }
        guessing = [0,0,0,0]
    }
}

function activateRow(Number) {
    let rowToActivate = document.getElementById(Number);
    let holesToActivate = rowToActivate.children;
    let arrayOfHoles = Array.from(holesToActivate);
    arrayOfHoles.forEach( function (hole){
        let circles = Array.from(hole.children);
        circles.forEach( function(circle) {
            circle.setAttribute("ondrop", "drop(event)");
            circle.setAttribute("ondragover", "allowDrop(event)");
        })
    })
}

function deactivateRow(Number) {
    let rowToActivate = document.getElementById(Number);
    let holesToActivate = rowToActivate.children;
    let arrayOfHoles = Array.from(holesToActivate);
    arrayOfHoles.forEach( function (hole){
        let circles = Array.from(hole.children);
        circles.forEach( function(circle) {
            circle.setAttribute("ondrop", "");
            circle.setAttribute("ondragover", "");
        })
    })
}