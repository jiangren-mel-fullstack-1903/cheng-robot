
function onCommandReset() {
    var mapCells = document.querySelectorAll('.map-cell');
    mapCells[12].innerHTML = 'A';
}

function onCommandUp() {
    var mapCells = document.querySelectorAll('.map-cell');
    var currentRobotLocation = 0;
    for (var i = 0; i < mapCells.length; i++) {
        if (mapCells[i].innerHTML.length > 0) {
            currentRobotLocation = i;
            break;
        }
    }
    mapCells[currentRobotLocation].innerHTML = '';
    // todo check the available of the target position
    mapCells[currentRobotLocation - 4].innerHTML = 'A';
}