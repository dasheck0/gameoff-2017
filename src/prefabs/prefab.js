/**
 * Created by s.neidig on 11/07/17.
 */


let Game = Game || {};

Game.Prefab = function (state, name, position, properties) {
    Phaser.Sprite.call(this, state.game, position.x, position.y, properties.key);

    this.state = state;
    this.name = name;
    this.properties = properties;
    this.state.prefabs[name] = this;
    this.game = state.game;

    if (properties.group) {
        this.state.groups[properties.group].add(this);
    }

    if (properties.frame) {
        this.frame = properties.frame;
    }

    if (properties.anchor) {
        this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    }

    if (properties.scale) {
        this.scale.setTo(properties.scale.x, properties.scale.y);
    }

    if (properties.alpha !== undefined) {
        this.alpha = properties.alpha;
    }

    if (properties.angle) {
        this.angle = properties.angle;
    }

    if (properties.mirror) {
        if (properties.mirror.x) {
            this.scale.x *= -1;
        }

        if (properties.mirror.y) {
            this.scale.y *= -1;
        }
    }

    console.log("loaded sprite");

    this.fixedToCamera = properties.fixedToCamera;
};

Game.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Game.Prefab.prototype.constructor = Game.Prefab;

Game.Prefab.prototype.render = function () {
    this.game.debug.spriteInfo(this, 32, 32);
};