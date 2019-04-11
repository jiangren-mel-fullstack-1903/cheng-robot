class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getUpPosition() {
        return new Position(this.x, this.y - 1);
    }
}

class GameObject {
    constructor(position, icon, map) {
        this.position = position;
        this.icon = icon;
        this.map = map;
    }
}

class MovingObject extends GameObject {
    constructor(position, icon, map) {
        super(position, icon, map);
        this.history = [];
    }
    move(newPosition) {
        if (this.map.availablePosition(newPosition)) {
            this.history.push(this.position);
            this.position = newPosition;
            // this.state = Object.assign({}, this.state, {robotPosition: newPosition});
            return true;
        } else {
            return false;
        }
    }

    reverse() {
        this.position = this.history.pop();
    }
}

class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    availablePosition(newPosition) {
        if (newPosition.x >= 0 && newPosition.x < this.width
            && newPosition.y >= 0 && newPosition.y < this.height
        ) {
            return true;
        } else {
            return false;
        }
    }

    positionToIndex(position) {
        return position.x + position.y * this.width;
    }
}

class Game {
    constructor() {
        this.map = new Map(4, 4);
        this.robot = new MovingObject(null, "R", this.map);
    }

    start(startPosition) {
        this.robot.move(startPosition);
        this.render();
    }

    onCommandUp() {
        // this.history.push(this.state);
        this.robot.move(this.robot.position.getUpPosition());
        this.render();
    }

    onCommandBack() {
        this.robot.reverse();
        this.render();
    }
    
    render() {
        let mapCells = document.querySelectorAll('.map-cell');
        let robotIndex = this.map.positionToIndex(this.robot.position);
        mapCells.forEach((aCell, i) => {
            if (i === robotIndex) {
                mapCells[i].innerHTML = this.robot.icon;
            } else {
                mapCells[i].innerHTML = '';
            }
        })
    }
}



let game = new Game();

game.start(new Position(0, 3));