export class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
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

export class GameObject {
    position: Position;
    icon: String;
    map: GameMap
    constructor(position: Position, icon: String, map: GameMap) {
        this.position = position;
        this.icon = icon;
        this.map = map;
    }
}

export class MovingObject extends GameObject {
    history: Position[];
    constructor(position: Position, icon: String, map: GameMap) {
        super(position, icon, map);
        this.history = [];
    }
    move(newPosition: Position) {
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

export class GameMap {
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

export class Game {
    map: GameMap;
    robot: MovingObject;
    constructor() {
        this.map = new GameMap(4, 4);
        this.robot = new MovingObject(null, "R", this.map);
    }

    start(startPosition: Position) {
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
        return this.robot.icon + ' ' + this.robot.position.x + ' ' + this.robot.position.y;
    }
}



let game = new Game();

game.start(new Position(0, 3));

let stdin = process.openStdin();

stdin.addListener("data", function(d) {
    let command = d.toString().trim();

    if (command === 'start') {
        game.start(new Position(0, 3));
    } else if (command === 'up') {
        game.onCommandUp();
    } else if (command === 'right') {
        game.onCommandRight();
    } else if (command === 'report') {
        console.log(game.render());
    }
});