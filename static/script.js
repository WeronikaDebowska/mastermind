var numberOfFilledHoles = 0;
ActivateRow(1)

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text"); //dragged pegs
    let guess = ev.target;                      //state after peg drop
    guess.style.color = data.toString();
    guess.className = "fas fa-circle fa-3x";
    numberOfFilledHoles += 1;
    checkStatus()
}

function checkStatus() {
    if (numberOfFilledHoles % 4 == 0){
        alert('time for chsanging a row')
        let numberOfRowCompleted = numberOfFilledHoles / 4;
        console.log(numberOfRowCompleted)
        let numberOfRowToActivate = numberOfRowCompleted + 1;
        console.log(numberOfRowToActivate)
        ActivateRow(numberOfRowToActivate);
        DesactivateRow(numberOfRowCompleted);

    }
}

function checkIfEnd() {
    checkIfGuessed();
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
    let RowToActivate = document.getElementById(Number);
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