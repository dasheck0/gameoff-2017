let Game = Game || {};

Game.BootState = function () {
    Phaser.State.call(this);
};

Game.BootState.prototype = Object.create(Phaser.State.prototype);
Game.BootState.prototype.constructor = Game.BootState;

Game.BootState.prototype.init = function (gameStateData, nextGameStateName) {
    this.data = gameStateData;
    this.nextGameStateName = nextGameStateName;
};

Game.BootState.prototype.preload = function () {
    for (let name  in this.data) {
        if (this.data.hasOwnProperty(name)) {
            this.load.text(name, this.data[name]);
        }
    }
};

Game.BootState.prototype.create = function () {
    const content = this.game.cache.getText(this.nextGameStateName);
    const payload = JSON.parse(content);

    this.prepareScreenForScaling();
    this.game.state.start('loadingState', true, false, payload, this.nextGameStateName);
};

Game.BootState.prototype.prepareScreenForScaling = function () {
    this.game.stage.disableVisibilityChange = true;

    this.game.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
    this.game.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.windowConstraints.bottom = 'visual';
}