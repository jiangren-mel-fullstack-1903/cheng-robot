class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface GameObject {
    position: Position;
    map: GameMap;
    display(): void;
}

interface Movable {
    moveLeft(): void;
    moveRight(): void;
    moveUp(): void;
    moveDown(): void;
}

class MovingObject implements GameObject, Movable {
    position: Position;
    map: GameMap;
    constructor(map: GameMap) {
        this.map = map;
    }
    move(newPosition: Position) {
        if (this.map.availablePosition(newPosition)) {
            this.position = newPosition;
            // this.state = Object.assign({}, this.state, {robotPosition: newPosition});
            return true;
        } else {
            return false;
        }
    }
    display() {}
    moveLeft() {}
    moveRight() {}
    moveUp() {}
    moveDown() {}
}

class Robot extends MovingObject {
    display() {
        return 'R';
    }
    moveLeft() {
        let targetPosition = {...this.position, x: this.position.x - 1};
        this.move(targetPosition);
    }
    moveRight() {
        let targetPosition = {...this.position, x: this.position.x + 1};
        this.move(targetPosition);
    }
    moveUp() {
        let targetPosition = {...this.position, y: this.position.y - 1};
        this.move(targetPosition);
    }
    moveDown() {
        let targetPosition = {...this.position, y: this.position.y + 1};
        this.move(targetPosition);
    }
}

class Horse extends MovingObject {
    display() {
        return 'H';
    }
    moveLeft() {
        let targetPosition = {...this.position, x: this.position.x - 2};
        this.move(targetPosition);
    }
    moveRight() {
        let targetPosition = {...this.position, x: this.position.x + 2};
        this.move(targetPosition);
    }
    moveUp() {
        let targetPosition = {...this.position, y: this.position.y - 2};
        this.move(targetPosition);
    }
    moveDown() {
        let targetPosition = {...this.position, y: this.position.y + 2};
        this.move(targetPosition);
    }
}

class GameMap {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    availablePosition(newPosition: Position) {
        if (newPosition.x >= 0 && newPosition.x < this.width
            && newPosition.y >= 0 && newPosition.y < this.height
        ) {
            return true;
        } else {
            return false;
        }
    }

    positionToIndex(position: Position) {
        return position.x + position.y * this.width;
    }
}

class Game {
    map: GameMap;
    robot: MovingObject;
    constructor() {
        this.map = new GameMap(4, 4);
        this.robot = new Robot(this.map);
    }

    start(startPosition: Position) {
        this.robot.move(startPosition);
    }

    onCommandUp() {
        this.robot.moveUp();
    }

    onCommandRight() {
        this.robot.moveRight();
        if (this.robot.position.x === this.map.width - 1) {
            this.map.width += 1;
        }
    }

    onCommandLeft() {
        this.robot.moveLeft();
    }
    
    render() {
        return this.robot.display() + ' ' + this.robot.position.x + ' ' + this.robot.position.y;
    }
}



let game = new Game();

game.start(new Position(0, 3));

let stdin = process.openStdin();

stdin.addListener("data", function(d) {
    let command = d.toString().trim();

    if (command === 'start robot') {
        game.robot = new Robot(game.map);
        game.start(new Position(0, 3));
    } else if (command === 'start horse') {
        game.robot = new Horse(game.map);
        game.start(new Position(0, 3));
    } else if (command === 'up') {
        game.onCommandUp();
    } else if (command === 'right') {
        game.onCommandRight();
    } else if (command === 'report') {
        console.log(game.render());
    }
});