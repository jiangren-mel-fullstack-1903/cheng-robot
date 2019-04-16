function createPosition(x, y) {
    this.x = x;
    this.y = y;
    this.toIndex = function(mapWidth) {
        return this.x + this.y * mapWidth;
    };
}

function createMovingObject(position, icon) {
    this.position = position;
    this.icon = icon;
}

function createGame(mapWidth, mapHeight, robot) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.robot = robot;
    this.history = [];

    this.init = function() {
        this.robot.position.y = 3;
    };
    
    this.onCommandUp = function() {
        this.history.push(this.robot.position);
        var targetPosition = new createPosition(this.robot.position.x, this.robot.position.y - 1);
        this.move(targetPosition);
    };

    this.onCommandBack = function() {
        this.move(this.history.pop());
    };
    
    this.availablePosition = function(newPosition) {
        if (newPosition.x >= 0 && newPosition.x < this.mapWidth
            && newPosition.y >= 0 && newPosition.y < this.mapHeight
        ) {
            return true;
        } else {
            return false;
        }
    };

    this.move = function(newPosition) {
        if (this.availablePosition(newPosition)) {
            this.robot.position = newPosition;
            // this.state = Object.assign({}, this.state, {robotPosition: newPosition});
            this.render();
            return true;
        } else {
            return false;
        }
    };

    this.render = function() {
        var mapCells = document.querySelectorAll('.map-cell');
        var robotIndex = this.robot.position.toIndex(this.mapWidth);
        mapCells.forEach((aCell, i) => {
            if (i === robotIndex) {
                mapCells[i].innerHTML = this.robot.icon;
            } else {
                mapCells[i].innerHTML = '';
            }
        })
        // for (var i = 0; i < mapCells.length; i++) {
        //     if (i === robotIndex) {
        //         mapCells[i].innerHTML = 'R';
        //     } else {
        //         mapCells[i].innerHTML = '';
        //     }
        // }
    }
}

var initPosition = new createPosition(0, 0);
var robot = new createMovingObject(initPosition, "R");
var game = new createGame(4, 4, robot)

game.init();
game.render();