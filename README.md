# Gameoff 2017

This is my contribution to the [2017 Game off](https://itch.io/jam/game-off-2017). 
The competion is held from November 1st to November 30th 2017 with the goal to create
a game with a certain theme. The theme is 'throwback', which can be interpreted in the way you want. 

I think of it as retro-ish and try to come up with a new combat system disguised as classical problem.
The previously mentioned classical problem is the Conways Game of Life. Assume you have 2D map, where each square 
represents a value. The value can either be 0 (unset), 1 (your team) or 2 (enemy team). Before the game begins 
the value of each cell is set randomly based on some criteria (i.e. strength, modifiers, ...). 
By applying a modified set of rules you can determine the value of each cell for the next generation (i.e. round). 
Then you let the teams fight till one of the team is winning (i.e. having a certain percentage of the board won) or 
for a predefined amount of rounds (i.e. 10).

Once this is setup we can apply interesting variations. This could be one of the following:

* RPG Elements (Attack, Defense, Health, Buffs, Heros, ...)
* Trading card system (i.e. collecting cards to prepare the game area, outcome of the fight, ...)
* Boss fights
* Different game modes (Story, Endless, PvP, Interactive)
* Random Events, which affect the battle (i.e. Lightning strikes, Earthquake, ...)
* Elements (i.e. Water, Fire, Earth, Wind, ...)

## Game

### Installation

To create the games dist folder you have to setup the build
pipeline. This is as easy as running `npm install` on the projects 
directory. This will install required dependencies (i.e. gulp). Then 
run `gulp transpile minify` to create the `dist` directory, which will
contain the games sources. 

### Objective


### Features

## Road map

### Crucial

### Important

### Nice to have

### Not for competition

### Done

## Considerations

This game was developed as part of a hackathon. Keep that in mind. The code
and its structure does not need to apply to the highest quality standards
and this game might contain bugs. If you have feedback to both see the about me
section to find out how you can get in contact with me to actually tell me
your feedback. 

While the game runs on 60 fps on my machine it does not need to do so on 
yours (especially when your device is a mobile device). There are many
objects, which need to be rendered and calculated. There can be many 
optimizations done, but again, this was a hackathon. So bear with me!

## Used assets

### Images

### Sounds

## About me

I am from Germany and involved with programming for almost 15 years. I
actually started with developing games back in the days with C++ and OpenGL,
before switching to Irrlicht 3D, Unity 3D and finally PhaserJS. So far
PhaserJS gave me the best experience, since it is easy to understand
and extremly powerful letting me completely focus on the actual game. 
Projects with the previously mentioned engines were never completed, since
I got stuck in patching the engine or building missing parts 
(i.e. gamestates, object pooling, ...). 

This is one of the first bigger games I finished. It will be released on itch.io (TODO add link!). 
Any feedback is appreciated. You can contact my via twitter, email or provide the feedback directly via itch.io.
Thanks for reading, playing and feedbacking!

## License

This game is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT)