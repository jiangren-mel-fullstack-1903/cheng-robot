var game = {
    DIRECTION: {
        north: 'A', east: '->', south: 'V', west: '<-'
    },
    state: {
        robotPosition: {
            x: 0, y: 0
        },
        mapSize: {
            x: 4, y: 4
        }
    },
    history: [],
    toIndex(position, mapSize) {
        return position.x + position.y * mapSize.y;
    },
    init() {
        this.state.robotPosition.y = 3;
        // let { robotPosition } = this.state;
        // robotPosition.y = 3;
    },
    onCommandUp() {
        this.history.push(this.state);
        this.move({ x: this.state.robotPosition.x, y: this.state.robotPosition.y - 1 });
    },
    onCommandBack() {
        this.move(this.history.pop().robotPosition);
    },
    availablePosition(newPosition, mapSize) {
        if (newPosition.x >= 0 && newPosition.x < mapSize.x
            && newPosition.y >= 0 && newPosition.y < mapSize.y
        ) {
            return true;
        } else {
            return false;
        }
    },
    move(newPosition) {
        if (this.availablePosition(newPosition, this.state.mapSize)) {
            this.state.robotPosition = newPosition;
            // this.state = Object.assign({}, this.state, {robotPosition: newPosition});
            this.render();
            return true;
        } else {
            return false;
        }
    },
    render() {
        var mapCells = document.querySelectorAll('.map-cell');
        var robotIndex = this.toIndex(this.state.robotPosition, this.state.mapSize);
        mapCells.forEach((aCell, i) => {
            if (i === robotIndex) {
                mapCells[i].innerHTML = 'R';
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


game.init();
game.render();