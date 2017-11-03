class Room {

    constructor(length, height, x, y, depth) {
        this.length = length;
        this.height = height;
        this.x = x;
        this.y = y;
        this.depth = depth || 0;

        this.children = [];
        this.hallways = [];
    }

    split() {
        this.children = [];

        const splitLength = Room.rand(Math.max(Room.MIN_WIDTH, this.length * Room.LOW_CUT), Math.min(this.length - Room.MIN_WIDTH, this.length * Room.HIGH_CUT));
        const splitHeight = Room.rand(Math.max(Room.MIN_HEIGHT, this.height * Room.LOW_CUT), Math.min(this.height - Room.MIN_HEIGHT, this.length * Room.HIGH_CUT));

        if (splitLength > 0 && splitHeight > 0) {
            this.children.push(new Room(splitLength, splitHeight, this.x, this.y, this.depth + 1));
            this.children.push(new Room(this.length - splitLength, splitHeight, this.x + splitLength, this.y, this.depth + 1));
            this.children.push(new Room(splitLength, this.height - splitHeight, this.x, this.y + splitHeight, this.depth + 1));
            this.children.push(new Room(this.length - splitLength, this.height - splitHeight, this.x + splitLength, this.y + splitHeight, this.depth + 1));
        } else {
            if (splitLength > 0) {
                this.children.push(new Room(splitLength, this.height, this.x, this.y, this.depth + 1));
                this.children.push(new Room(this.length - splitLength, this.height, this.x + splitLength, this.y, this.depth + 1));
            } else if (splitHeight > 0) {
                this.children.push(new Room(this.length, splitHeight, this.x, this.y, this.depth + 1));
                this.children.push(new Room(this.length, this.height - splitHeight, this.x, this.y + splitHeight, this.depth + 1));
            }
        }

        if (this.depth < Room.MAX_DEPTH) {
            this.children.forEach(child => child.split());
        }
    }

    inspect() {
        console.log(`Room x: ${this.x}, y: ${this.y}, l: ${this.length}, h: ${this.height}`);
        this.children.forEach(child => child.inspect());
    }

    leaves() {
        if (this.children.length === 0) {
            return this;
        }

        return _.flatten(this.children.map(child => child.leaves()));
    }

    /* static methods */

    static get MIN_WIDTH() {
        return 48;
    }

    static get MIN_HEIGHT() {
        return 48;
    }

    static get LOW_CUT() {
        return 0.3;
    }

    static get HIGH_CUT() {
        return 0.7;
    }

    static get MAX_DEPTH() {
        return 1;
    }

    /* private methods */

    static rand(min, max) {
        if (min < max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return false;
    }
}