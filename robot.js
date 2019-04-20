class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getUpPosition() {
        return new Position(this.x, this.y - 1);
    }

    getRightPosition() {
        return new Position(this.x + 1, this.y);
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
    moveLeft() {
            this.history.push(this.position);
            this.position.x -= 1;
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
        this.dump = 100000;
        this.engine = new Engine(this);
    }

    start(startPosition) {
        this.robot.move(startPosition);
        this.render();
    }

    onCommandUp() {
        this.robot.move(this.robot.position.getUpPosition());
        this.render();
    }

    onCommandRight() {
        this.robot.move(this.robot.position.getRightPosition());
        if (this.robot.position.x === this.map.width - 1) {
            this.map.width += 1;
        }
        this.render();
    }

    onCommandLeft() {
        this.robot.moveLeft();
        this.render();
    }

    onCommandBack() {
        this.robot.reverse();
        this.render();
    }
    
    render() {
        this.engine.render();
        // this.engine.render();
    }
}

class Engine {
    constructor(state) {
        this.state = state;
        this.lastSate = {};
    }

    toDom() {
        let gameMap = document.createElement("div");
        gameMap.className += " game-map";
        gameMap.setAttribute("id", "game-map");

        for (let y = 0; y < this.state.map.height; y++) {
            let row = document.createElement("div");
            row.className += " map-row";
            gameMap.appendChild(row);
            for (let x = 0; x < this.state.map.width; x++) {
                let cell = document.createElement("div");
                cell.className += " map-cell"
                if (this.state.robot.position.x === x && this.state.robot.position.y === y) {
                    cell.innerHTML = this.state.robot.icon;
                }
                row.appendChild(cell);
            }
        }

        for (let i = 0; i < this.state.dump; i++) {
            let aSpan = document.createElement("span");
            aSpan.setAttribute("background-color", "blue");
            gameMap.appendChild(aSpan);
        }

        return gameMap;
    }

    stateChanged() {
        if (!this.lastSate.robot) {
            return true;
        } 
        return this.lastSate.robot.position !== this.state.robot.position;
    }

    render() {
        if (!this.stateChanged()) {
            return;
        }

        this.lastSate = {
            ...this.state,
            robot: {...this.state.robot}
        };

        let root = document.getElementById("game-map");
        root.replaceWith(this.toDom());
    }
}


let game = new Game();

game.start(new Position(0, 3));