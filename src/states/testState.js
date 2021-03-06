let Game = Game || {};

Game.TestState = function () {
    Game.BaseState.call(this);

    this.prefabClasses = {
        'sprite': Game.Prefab.prototype.constructor,
        'charakterChooser': Game.CharakterChooser.prototype.constructor
    }
};

Game.TestState.prototype = Object.create(Game.BaseState.prototype);
Game.TestState.prototype.constructor = Game.TestState;

Game.TestState.prototype.create = function () {
    Game.BaseState.prototype.create.call(this);

    // this.graphics = this.game.add.graphics(0, 0);
    // this.graphics.lineStyle(1, 0x000000, 1);
    //
    // this.board = new ConwayBoard(32, 20);
    // this.board.initialize(3);
    // //this.drawBoard();
    //
    // // this.game.input.onDown.add(() => {
    // //     this.board.nextIteration();
    // //     this.drawBoard();
    // // }, this);
    //
    // this.game.time.events.loop(0.25 * Phaser.Timer.SECOND, () => {
    //     this.board.nextIteration();
    //     // this.drawBoard();
    // }, this);

    this.prefabs.charakterChooser.showCharakter(0, true);
};

Game.TestState.prototype.update = function () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.prefabs.charakterChooser.showPrevious();
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.prefabs.charakterChooser.showNext();
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.prefabs.charakterChooser.chooseCharakter((index) => {
            console.log("You chose the robot with the id ", index);
        }, this);
    }
};

// Game.TestState.prototype.drawBoard = function () {
//     const colors = [0xffffff, 0xff0000, 0x00ff00, 0x0000ff];
//     const size = 32;
//
//     this.graphics.clear();
//
//     _.forIn(this.board.cells, (value, position) => {
//         const [x, y] = position.split(',');
//
//         this.graphics.beginFill(colors[value] || 0x000000);
//         this.graphics.drawRect(x * size, y * size, size, size);
//         this.graphics.endFill();
//     });
// };