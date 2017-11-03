class ConwayBoard {

    constructor(length, height) {
        this.length = length;
        this.height = height;
        this.tilt = false;
        this.stack = [];
        this.cells = {};
    }

    initialize(partyCount) {
        this.cells = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.length; x++) {
                const position = `${x},${y}`;

                if (ConwayBoard.rand(0, 9) < 7) {
                    this.cells[position] = 0;
                } else {
                    this.cells[position] = ConwayBoard.rand(0, partyCount);
                }
            }
        }
    }

    nextIteration() {
        if (this.tilt) {
            return;
        }

        const nextIteration = _.assign({}, this.cells);

        _.forIn(this.cells, (value, position) => {
            const [x, y] = position.split(',').map(p => parseInt(p));
            const neighbors = this.getNeigborsOfCell(this.cells, x, y);

            const aliveNeighbors = _.omit(neighbors, [0]);
            const aliveNeighborCount = _.values(aliveNeighbors).reduce((a, b) => a + b, 0);

            if (value === 0) {
                if (aliveNeighborCount === 3) {
                    const maxValue = _.maxBy(_.entries(aliveNeighbors), entry => entry[1])[1];
                    const agent = _.sample(_.entries(aliveNeighbors).filter(entry => entry[1] === maxValue))[0];

                    nextIteration[position] = agent;
                } else {
                    nextIteration[position] = 0;
                }
            } else {
                if (aliveNeighborCount < 2) {
                    nextIteration[position] = 0;
                } else if (aliveNeighborCount > 3) {
                    nextIteration[position] = 0;
                } else {
                    nextIteration[position] = value;
                }
            }
        });

        if (this.stack.length > ConwayBoard.STACK_SIZE) {
            this.stack.shift();
        }

        const state = _.sortBy(_.entries(nextIteration), entry => entry[0]).map(entry => entry[1]).join('');
        this.stack.push(state);

        this.tilt = this.stack.length !== _.uniq(this.stack).length;
        if (this.tilt) {
            console.log("found titl");
        }

        this.cells = nextIteration;
    }

    /* private */

    getNeigborsOfCell(cells, x, y) {
        const neighbors = {};

        for (let xStep = x - 1; xStep <= x + 1; xStep += 1) {
            for (let yStep = y - 1; yStep <= y + 1; yStep += 1) {
                if (!(xStep === x && yStep === y)) {
                    const xValue = ConwayBoard.INFINITE ? ConwayBoard.mod(xStep, this.length) : xStep;
                    const yValue = ConwayBoard.INFINITE ? ConwayBoard.mod(yStep, this.height) : yStep;

                    const key = `${xValue},${yValue}`;
                    const value = cells[key] || -1;

                    if (value >= 0) {
                        if (neighbors[value]) {
                            neighbors[value] += 1;
                        } else {
                            neighbors[value] = 1;
                        }
                    }
                }
            }
        }

        return neighbors;
    }

    static rand(includingMin, includingMax) {
        if (includingMin < includingMax) {
            return Math.floor(Math.random() * (includingMax - includingMin + 1)) + includingMin;
        }

        return false;
    }

    static mod(k, n) {
        return ((k % n) + n) % n;
    }

    /* properties */

    static get INFINITE() {
        return true;
    }

    static get STACK_SIZE() {
        return 6;
    }
}