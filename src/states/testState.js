let Game = Game || {};

Game.TestState = function () {
    Phaser.State.call(this);
};

Game.TestState.prototype = Object.create(Phaser.State.prototype);
Game.TestState.prototype.constructor = Game.TestState;

Game.TestState.prototype.create = function () {

    // const room = new Room(1000, 1000, 0, 0);
    // room.split();
    // room.inspect();
    //
    // const leaves = room.leaves();
    // console.log(leaves.length);
    //
    // const graphics = this.game.add.graphics(0, 0);
    // graphics.lineStyle(2, 0xffffff, 2);
    //
    // leaves.forEach((leaf) => {
    //     graphics.beginFill(0xff0000);
    //     graphics.drawRect(leaf.x, leaf.y, leaf.length, leaf.height);
    //     graphics.endFill();
    // });

    this.graphics = this.game.add.graphics(0, 0);
    this.graphics.lineStyle(1, 0x000000, 1);

    this.board = new ConwayBoard(32, 32);
    this.board.initialize(3);
    this.drawBoard();

    this.game.time.events.loop(0.25 * Phaser.Timer.SECOND, () => {
        this.board.nextIteration();
        this.drawBoard();
    }, this);
};

Game.TestState.prototype.drawBoard = function () {
    const colors = [0xffffff, 0xff0000, 0x00ff00, 0x0000ff];
    const size = 32;

    this.graphics.clear();

    _.forIn(this.board.cells, (value, position) => {
        const [x, y] = position.split(',');

        this.graphics.beginFill(colors[value]);
        this.graphics.drawRect(x * size, y * size, size, size);
        this.graphics.endFill();
    });
};