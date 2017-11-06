Game.BaseState = function () {
    Phaser.State.call(this);

    this.groups = {};
    this.prefabs = {};
};

Game.BaseState.prototype = Object.create(Phaser.State.prototype);
Game.BaseState.prototype.constructor = Game.BaseState;

Game.BaseState.prototype.init = function (data) {
    this.data = data;

    if (this.data.state) {
        this.game.time.advancedTiming = this.data.state.advancedTiming;
        this.game.stage.backgroundColor = `#${this.data.state.backgroundColor}`;

        if (this.data.state.physics && this.data.state.physics.enabled) {
            const type = this.data.state.physics.type;
            const physicSystems = { arcade: Phaser.Physics.ARCADE }[type];

            if (physicSystems) {
                this.game.physics.startSystem(physicSystems)
            }
        }
    }
};

Game.BaseState.prototype.create = function () {
    this.data.groups.forEach(groupName => (this.groups[groupName] = this.game.add.group()), this);
    for (let prefabName in this.data.prefabs) {
        if (this.data.prefabs.hasOwnProperty(prefabName)) {
            this.createPrefab(prefabName, this.data.prefabs[prefabName]);
        }
    }
};

Game.BaseState.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        this.prefabs[prefabName] = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);
    }
};