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
        return this.robot.icon + ' ' + this.robot.position.x + ' ' + this.robot.position.y;
    }
}


let game = new Game();

game.start(new Position(0, 3));


var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
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