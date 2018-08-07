var numberOfRowsCompleted = 0;
var guessing = [0,0,0,0]
var code = [1,2,4,6]
ActivateRow(1)

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    var idOfPegDragged = ev.dataTransfer.getData("text"); //dragged pegs
    var pegDragged = document.getElementById(idOfPegDragged);
    var ColorDragged = pegDragged.style.color;
    
    var guess = ev.target;                      //state after peg drop
    guess.style.color = ColorDragged;
    guess.className = "fas fa-circle fa-3x";
    
    var index = Number(guess.id.slice(-1))-1;
    guessing[index] = idOfPegDragged;
    console.log(guessing);
    checkStatus()
}

function checkStatus() {
    if (guessing.includes(0) == false){
        if (guessing == code){
            alert('WIN');
        } else if (numberOfRowsCompleted == 10) {
                alert('LOOSE');
            } else {
                numberOfRowsCompleted += 1;
                let numberOfRowToActivate = numberOfRowsCompleted + 1;
                ActivateRow(numberOfRowToActivate);
                if (numberOfRowsCompleted > 0){
                DesactivateRow(numberOfRowsCompleted);
                }
            } 
            guessing = [0,0,0,0]
        }
    }

function ActivateRow(Number) {
    let RowToActivate = document.getElementById(Number);
    let holesToActivate = RowToActivate.children;
    let ArrayOfHoles = Array.from(holesToActivate);
    ArrayOfHoles.forEach( function (hole){
        let circles = Array.from(hole.children);
        circles.forEach( function(circle) {
            circle.setAttribute("ondrop", "drop(event)");
            circle.setAttribute("ondragover", "allowDrop(event)");
        })
    })
}

function DesactivateRow(Number) {
    console.log(Number)
    let RowToActivate = document.getElementById(Number);
    console.log('TU',RowToActivate);
    let holesToActivate = RowToActivate.children;
    let ArrayOfHoles = Array.from(holesToActivate);
    ArrayOfHoles.forEach( function (hole){
        let circles = Array.from(hole.children);
        circles.forEach( function(circle) {
            circle.setAttribute("ondrop", "");
            circle.setAttribute("ondragover", "");
        })
    })
}