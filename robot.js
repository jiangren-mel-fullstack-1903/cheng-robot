"use strict";
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
exports.__esModule = true;
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    Position.prototype.getUpPosition = function () {
        return new Position(this.x, this.y - 1);
    };
    Position.prototype.getRightPosition = function () {
        return new Position(this.x + 1, this.y);
    };
    return Position;
}());
exports.Position = Position;
var GameObject = /** @class */ (function () {
    function GameObject(position, icon, map) {
        this.position = position;
        this.icon = icon;
        this.map = map;
    }
    return GameObject;
}());
exports.GameObject = GameObject;
var MovingObject = /** @class */ (function (_super) {
    __extends(MovingObject, _super);
    function MovingObject(position, icon, map) {
        var _this = _super.call(this, position, icon, map) || this;
        _this.history = [];
        return _this;
    }
    MovingObject.prototype.move = function (newPosition) {
        if (this.map.availablePosition(newPosition)) {
            this.history.push(this.position);
            this.position = newPosition;
            // this.state = Object.assign({}, this.state, {robotPosition: newPosition});
            return true;
        }
        else {
            return false;
        }
    };
    MovingObject.prototype.moveLeft = function () {
        this.history.push(this.position);
        this.position.x -= 1;
    };
    MovingObject.prototype.reverse = function () {
        this.position = this.history.pop();
    };
    return MovingObject;
}(GameObject));
exports.MovingObject = MovingObject;
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
exports.GameMap = GameMap;
var Game = /** @class */ (function () {
    function Game() {
        this.map = new GameMap(4, 4);
        this.robot = new MovingObject(null, "R", this.map);
    }
    Game.prototype.start = function (startPosition) {
        this.robot.move(startPosition);
        this.render();
    };
    Game.prototype.onCommandUp = function () {
        this.robot.move(this.robot.position.getUpPosition());
        this.render();
    };
    Game.prototype.onCommandRight = function () {
        this.robot.move(this.robot.position.getRightPosition());
        if (this.robot.position.x === this.map.width - 1) {
            this.map.width += 1;
        }
        this.render();
    };
    Game.prototype.onCommandLeft = function () {
        this.robot.moveLeft();
        this.render();
    };
    Game.prototype.onCommandBack = function () {
        this.robot.reverse();
        this.render();
    };
    Game.prototype.render = function () {
        return this.robot.icon + ' ' + this.robot.position.x + ' ' + this.robot.position.y;
    };
    return Game;
}());
exports.Game = Game;
var game = new Game();
game.start(new Position(0, 3));
var stdin = process.openStdin();
stdin.addListener("data", function (d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    var command = d.toString().trim();
    if (command === 'start') {
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
