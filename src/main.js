let Game = Game || {};

window.onload = () => {
    const game = new Phaser.Game(Game.screenSize.x, Game.screenSize.y, Phaser.CANVAS);

    game.state.add('bootState', new Game.BootState());
    game.state.add('loadingState', new Game.LoadingState());
    game.state.add('testState', new Game.TestState());

    game.state.start('bootState', true, false, {
        testState: 'assets/json/testState.json'
    }, 'testState');



};