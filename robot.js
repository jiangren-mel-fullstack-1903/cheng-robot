var game = {
    DIRECTION: {
        north: 'A', east: '->', south: 'V', west: '<-'
    },
    state: {
        robotPosition: {
            x: 0, y: 0,
        },
        mapSize: {
            x: 4, y: 4
        }
    },
    toIndex(position, mapSize) {
        return position.x + position.y * mapSize.y;
    },
    init() {
        this.state.robotPosition.y = 3;
    },
    clearAll() {
        var cells = Array.prototype.slice.call(document.querySelectorAll('.map-cell'));
        cells.map(function (aCell) {
            aCell.innerHTML = '';
        });
        e.target.innerHTML = 'A';
    },
    onCommandUp() {
        this.move({ x: this.state.robotPosition.x, y: this.state.robotPosition.y - 1 });
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
            this.render();
            return true;
        } else {
            return false;
        }
    },
    render() {
        var mapCells = document.querySelectorAll('.map-cell');
        var robotIndex = this.toIndex(this.state.robotPosition, this.state.mapSize);
        mapCells.forEach(function(aCell, i) {
            if (i === robotIndex) {
                mapCells[i].innerHTML = this.DIRECTION.north;
            } else {
                mapCells[i].innerHTML = '';
            }
        })
        // for (var i = 0; i < mapCells.length; i++) {
        //     if (i === robotIndex) {
        //         mapCells[i].innerHTML = this.DIRECTION.north;
        //     } else {
        //         mapCells[i].innerHTML = '';
        //     }
        // }
    }
}


game.init();
game.render();