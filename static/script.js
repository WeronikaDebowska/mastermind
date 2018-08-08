var numberOfRowsCompleted = 0;
var guess = [0,0,0,0]
var code = []
var tempCode = []
var hint = [0,0,0,0]

generateCode()
activateRow(1)

function generateCode(){
    let pegs = ["A","B","C","D","E","F"]
    for (let i = 0; i < 4; i++){
        let randomIndex = Math.floor(Math.random()*pegs.length)
        code.push(pegs[randomIndex]);
    }
}

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
    
    var guessPeg = ev.target;  //state after peg drop
    guessPeg.style.color = colorDragged;
    guessPeg.className = "fas fa-circle fa-3x";
    
    var index = Number(guessPeg.id.slice(-1))-1;
    guess[index] = idOfPegDragged;
    checkStatus()
}

function fireworks() {
    let body = document.getElementsByTagName("body")[0];
    let decodingBoard = document.getElementById("decoding-board");
    let hints = document.getElementById("hints");
    document.getElementById("fireworks").setAttribute("class", "pyro")
    body.style.transition = "1s"
    body.style.backgroundColor = "#333"
    decodingBoard.style.transition = "1s"
    decodingBoard.style.backgroundColor = "#555"
    hints.style.transition = "1s"
    hints.style.color = "#555"
}

function revealCode() {
    var coveredCode = Array.from(document.querySelectorAll("#covered-pegs > .row > .column > i"));
    var colors = {"A": "tomato",
                  "B": "orange",
                  "C": "yellow",
                  "D": "forestgreen",
                  "E": "dodgerblue",
                  "F": "slateblue"}
    for(let i = 0; i < coveredCode.length; i++) {
        coveredCode[i].style.color = colors[code[i]]
        coveredCode[i].className = "fas fa-check-circle fa-3x";
    }
}

function winCondition() {
    if(guess.length !== code.length)
        return false;
    for(let i = guess.length; i--;) {
        if(guess[i] !== code[i])
            return false;
    }
    return true;
}

function checkStatus() {
    if (winCondition()){
        revealCode()
        fireworks()
        alert("You won!")
    }
    else if (guess.includes(0) == false){
        giveAHint(); 
        numberOfRowsCompleted += 1;
        let numberOfrowToActivate = numberOfRowsCompleted + 1;
        activateRow(numberOfrowToActivate);
        if (numberOfRowsCompleted > 0){
            deactivateRow(numberOfRowsCompleted);
        }
        guess = [0,0,0,0]
        hint=[0,0,0,0]
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
            circle.style.color = "#eee";
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

function giveAHint() {
    tempCode =  Array.from(code);
    for (let i=0; i < guess.length; i++ ){
        if (guess[i] === code[i]){
            hint[i]=2;
            code[i]="X";
        }
    }
    
    for (let i=0; i < guess.length; i++ ){
        if (code.includes(guess[i]) && hint[i] != 2){
            hint[i]=1;
            let index = code.indexOf(guess[i]);
            code[index]="X";
        } 
    }
    code = tempCode;
} 