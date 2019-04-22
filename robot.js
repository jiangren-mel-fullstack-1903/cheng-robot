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

class GameMap {
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        let map = new GameMap(4, 4);
        this.state = {
            map: map,
            robot: new MovingObject(new Position(0, 3), "R", map),
            dump: 100000
        } 
    }

    start(startPosition) {
        this.state.robot.move(startPosition);
        this.render();
    }

    onCommandUp = () => {
        this.state.robot.move(this.state.robot.position.getUpPosition());
        // let immutableObj = {...this.state.robot};
        // immutableObj.__proto__ = MovingObject.prototype;
        // immutableObj.move(immutableObj.position.getUpPosition());
        // this.setState({
        //     robot: immutableObj
        // })
    }

    onCommandRight = () => {
        this.state.robot.move(this.state.robot.position.getRightPosition());
        if (this.state.robot.position.x === this.state.map.width - 1) {
            this.state.map.width += 1;
        }
    }

    onCommandLeft = () => {
        this.state.robot.moveLeft();
    }

    onCommandBack = () => {
        this.state.robot.reverse();
    }
    
    render() {
        let rows = [];
        for (let y = 0; y < this.state.map.height; y++) {
            let cells = [];
            for (let x = 0; x < this.state.map.width; x++) {
                let theIcon = '';
                if (this.state.robot.position.x === x && this.state.robot.position.y === y) {
                    theIcon = this.state.robot.icon;
                }
                let cell = React.createElement('div', {className: 'map-cell', key: x}, theIcon);
                cells.push(cell);
            }
            rows.push(React.createElement('div', {className: 'map-row', key: y}, cells));
        }

        let spans = [];
        for (let i = 0; i < this.state.dump; i++) {
            let aSpan = React.createElement('span', {key: i});
            spans.push(aSpan);
        }

        let gameMap = React.createElement('div', {
            className: 'game-map',
            id: 'game-map'
        }, rows, spans);

        // buttons
        let buttonUp = React.createElement('button', {
            onClick: this.onCommandUp
        }, '^')

        let buttonBack = React.createElement('button', {
            onClick: this.onCommandBack
        }, '<-')

        let controlPanel = React.createElement('div', {className: 'control-panel'}, buttonUp, buttonBack);

        let gameBoard = React.createElement('div', {className: 'game-board'}, gameMap, controlPanel);

        return gameBoard;
    }
}
// class Hello extends React.Component {
//     render() {
//       return React.createElement('div', null, `Hello ${this.props.toWhat}`);
//     }
//   }
const domContainer = document.querySelector('.game-board');
ReactDOM.render(
    React.createElement(Game, null, null), 
    domContainer
);


// ReactDOM.render(
//     React.createElement(Hello, {toWhat: 'World'}, null),
//     domContainer
//   );