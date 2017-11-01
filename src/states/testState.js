let Game = Game || {};

Game.TestState = function () {
    Phaser.State.call(this);
};

Game.TestState.prototype = Object.create(Phaser.State.prototype);
Game.TestState.prototype.constructor = Game.TestState;

Game.TestState.prototype.create = function() {
}