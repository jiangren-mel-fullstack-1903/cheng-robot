var DIRECTION = {
    north: 'A', east: '->', south: 'V', west: '<-'
};

var state = {
    robotPosition: {
        x: 0, y: 0,
    },
    mapSize: {
        x: 4, y: 4
    }
}

function toIndex(position, mapSize) {
    return position.x + position.y * mapSize.y;
}

function init() {
    state.robotPosition.y = 3;
}

function clearAll() {
    var cells = Array.prototype.slice.call(document.querySelectorAll('.map-cell'));
    cells.map(function (aCell) {
        aCell.innerHTML = '';
    });
    e.target.innerHTML = 'A';
};

function onCommandUp() {
    move({ x: state.robotPosition.x, y: state.robotPosition.y - 1 });
}

function availablePosition(newPosition, mapSize) {
    if (newPosition.x >= 0 && newPosition.x < mapSize.x
        && newPosition.y >= 0 && newPosition.y < mapSize.y
    ) {
        return true;
    } else {
        return false;
    }
}

function move(newPosition) {
    if (availablePosition(newPosition, state.mapSize)) {
        state.robotPosition = newPosition;
        render();
        return true;
    } else {
        return false;
    }
}

function render() {
    var mapCells = document.querySelectorAll('.map-cell');
    var robotIndex = toIndex(state.robotPosition, state.mapSize);
    for (var i = 0; i < mapCells.length; i++) {
        if (i === robotIndex) {
            mapCells[i].innerHTML = DIRECTION.north;
        } else {
            mapCells[i].innerHTML = '';
        }
    }
}

init();
render();