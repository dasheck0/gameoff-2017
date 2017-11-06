let Game = Game || {};

Game.CharakterChooser = function (state, name, position, properties) {
    Game.Prefab.call(this, state, name, position, properties);

    this.isAnimating = false;

    this.index = 0;
    this.positionFadeOutLength = 100;
    this.animationTime = 500;

    this.charakters = [];
    properties.charakters.forEach((charakter, index) => {
        const charakterPrefab = new Game.Prefab(this.state, charakter.name, position, {
            alpha: 0,
            group: properties.pool,
            key: charakter.key,
            anchor: properties.anchor || { x: 1, y: 1 }
        });

        charakterPrefab.alpha = 0;

        this.charakters.push(charakterPrefab);
    });
};

Game.CharakterChooser.prototype = Object.create(Game.Prefab.prototype);
Game.CharakterChooser.prototype.constructor = Game.CharakterChooser;

Game.CharakterChooser.prototype.showNext = function () {
    if (!this.isAnimating) {
        this.index = mod(this.index + 1, this.charakters.length);
        this.showCharakter(this.index, true);
    }
};

Game.CharakterChooser.prototype.showPrevious = function () {
    if (!this.isAnimating) {
        this.index = mod(this.index - 1, this.charakters.length);
        this.showCharakter(this.index, false);
    }
};

Game.CharakterChooser.prototype.showCharakter = function (index, forward) {
    if (!this.isAnimating) {
        this.isAnimating = true;

        const currentIndex = mod(index, this.charakters.length);
        const lastIndex = mod(index + (forward ? -1 : 1), this.charakters.length);

        if (this.idleTween) {
            this.charakters[lastIndex].scale.y = 1;
            this.idleTween.stop();
            this.idleTween = null;
        }

        this.idleTween = this.game.add.tween(this.charakters[currentIndex].scale)
            .to({
                y: 1.1
            }, this.animationTime * 2, Phaser.Easing.Linear.None, true, 0, -1, true);

        this.charakters[lastIndex].x = Game.screenSize.x / 2;
        this.charakters[lastIndex].alpha = 1;
        this.game.add.tween(this.charakters[lastIndex])
            .to({
                alpha: 0,
                x: this.charakters[lastIndex].x + (forward ? 1 : -1 ) * this.positionFadeOutLength
            }, this.animationTime, Phaser.Easing.Quintic.Out, true)
            .onComplete.add(() => (this.isAnimating = false), this);

        this.charakters[currentIndex].x = Game.screenSize.x / 2 + (forward ? -1 : 1) * this.positionFadeOutLength;
        this.charakters[currentIndex].alpha = 0;
        this.game.add.tween(this.charakters[currentIndex])
            .to({
                alpha: 1,
                x: this.charakters[currentIndex].x + (forward ? 1 : -1) * this.positionFadeOutLength
            }, this.animationTime, Phaser.Easing.Quintic.Out, true)
            .onComplete.add(() => (this.isAnimating = false), this);
    }
};

Game.CharakterChooser.prototype.chooseCharakter = function (callback, context) {
    if (!this.isAnimating) {
        this.isAnimating = true;

        // center scale + fade animation
        this.game.add.tween(this.charakters[this.index])
            .to({
                alpha: 0.5,
                x: Game.screenSize.x * 1.5
            }, this.animationTime, Phaser.Easing.Quintic.Out, true)
            .onComplete.addOnce(() => {
            this.isAnimating = false;

            callback.call(context, this.index);
        }, this);
    }
};