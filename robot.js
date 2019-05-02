var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
}());
var MovingObject = /** @class */ (function () {
    function MovingObject(map) {
        this.map = map;
    }
    MovingObject.prototype.move = function (newPosition) {
        if (this.map.availablePosition(newPosition)) {
            this.position = newPosition;
            // this.state = Object.assign({}, this.state, {robotPosition: newPosition});
            return true;
        }
        else {
            return false;
        }
    };
    MovingObject.prototype.display = function () { };
    MovingObject.prototype.moveLeft = function () { };
    MovingObject.prototype.moveRight = function () { };
    MovingObject.prototype.moveUp = function () { };
    MovingObject.prototype.moveDown = function () { };
    return MovingObject;
}());
var Robot = /** @class */ (function (_super) {
    __extends(Robot, _super);
    function Robot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Robot.prototype.display = function () {
        return 'R';
    };
    Robot.prototype.moveLeft = function () {
        var targetPosition = __assign({}, this.position, { x: this.position.x - 1 });
        this.move(targetPosition);
    };
    Robot.prototype.moveRight = function () {
        var targetPosition = __assign({}, this.position, { x: this.position.x + 1 });
        this.move(targetPosition);
    };
    Robot.prototype.moveUp = function () {
        var targetPosition = __assign({}, this.position, { y: this.position.y - 1 });
        this.move(targetPosition);
    };
    Robot.prototype.moveDown = function () {
        var targetPosition = __assign({}, this.position, { y: this.position.y + 1 });
        this.move(targetPosition);
    };
    return Robot;
}(MovingObject));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Horse.prototype.display = function () {
        return 'H';
    };
    Horse.prototype.moveLeft = function () {
        var targetPosition = __assign({}, this.position, { x: this.position.x - 2 });
        this.move(targetPosition);
    };
    Horse.prototype.moveRight = function () {
        var targetPosition = __assign({}, this.position, { x: this.position.x + 2 });
        this.move(targetPosition);
    };
    Horse.prototype.moveUp = function () {
        var targetPosition = __assign({}, this.position, { y: this.position.y - 2 });
        this.move(targetPosition);
    };
    Horse.prototype.moveDown = function () {
        var targetPosition = __assign({}, this.position, { y: this.position.y + 2 });
        this.move(targetPosition);
    };
    return Horse;
}(MovingObject));
var GameMap = /** @class */ (function () {
    function GameMap(width, height) {
        this.width = width;
        this.height = height;
    }
    GameMap.prototype.availablePosition = function (newPosition) {
        if (newPosition.x >= 0 && newPosition.x < this.width
            && newPosition.y >= 0 && newPosition.y < this.height) {
            return true;
        }
        else {
            return false;
        }
    };
    GameMap.prototype.positionToIndex = function (position) {
        return position.x + position.y * this.width;
    };
    return GameMap;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.map = new GameMap(4, 4);
        this.robot = new Robot(this.map);
    }
    Game.prototype.start = function (startPosition) {
        this.robot.move(startPosition);
    };
    Game.prototype.onCommandUp = function () {
        this.robot.moveUp();
    };
    Game.prototype.onCommandRight = function () {
        this.robot.moveRight();
        if (this.robot.position.x === this.map.width - 1) {
            this.map.width += 1;
        }
    };
    Game.prototype.onCommandLeft = function () {
        this.robot.moveLeft();
    };
    Game.prototype.render = function () {
        return this.robot.display() + ' ' + this.robot.position.x + ' ' + this.robot.position.y;
    };
    return Game;
}());
var game = new Game();
game.start(new Position(0, 3));
var stdin = process.openStdin();
stdin.addListener("data", function (d) {
    var command = d.toString().trim();
    if (command === 'start robot') {
        game.robot = new Robot(game.map);
        game.start(new Position(0, 3));
    }
    else if (command === 'start horse') {
        game.robot = new Horse(game.map);
        game.start(new Position(0, 3));
    }
    else if (command === 'up') {
        game.onCommandUp();
    }
    else if (command === 'right') {
        game.onCommandRight();
    }
    else if (command === 'report') {
        console.log(game.render());
    }
});
