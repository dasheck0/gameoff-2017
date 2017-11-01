/**
 * Created by s.neidig on 11/07/17.
 */


let Game = Game || {};

Game.LoadingState = function () {
    Phaser.State.call(this);
};

Game.LoadingState.prototype = Object.create(Phaser.State.prototype);
Game.LoadingState.prototype.constructor = Game.LoadingState;

Game.LoadingState.prototype.init = function (data, nextState) {
    this.data = data;
    this.nextState = nextState;
};

Game.LoadingState.prototype.preload = function () {
    const assets = this.data.assets;

    for (let assetKey in assets) {
        if (assets.hasOwnProperty(assetKey)) {
            const asset = assets[assetKey];

            switch (asset.type) {
                case "image":
                    this.load.image(assetKey, asset.source);
                    break;
                case "spritesheet":
                    this.load.spritesheet(assetKey, asset.source, asset.frameWidth, asset.frameHeight, asset.frames, asset.margin || 0, asset.spacing || 0);
                    break;
                case "sound":
                    this.load.audio(assetKey, asset.source);
                    break;
            }
        }
    }
};

Game.LoadingState.prototype.create = function () {
    this.game.state.start(this.nextState, true, false, this.data);
};