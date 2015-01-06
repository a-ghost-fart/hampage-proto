var Player = require('../objects/Player');
var Hench = require('../objects/Hench');
var Input = require('../util/Input');
var Keys = require('../conf/Keys');
var MathUtils = require('../util/MathUtils');

function Game() {
    'use strict';
    this.last_frame = Date.now();
    this.frame_count = 0;
    this.fps = 0;
    this.tick_time = 0;

    this.entities = [];
    this.player = new Player();
    this.hench = new Hench();
    this.entities.push(this.player);
    this.entities.push(this.hench);

    // Create canvas and context
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.canvas.style.backgroundColor = '#000';
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.input = new Input(this.canvas);

    this.game_loop();
}

Game.prototype.game_loop = function () {
    'use strict';
    this.update();
    this.draw();
    requestAnimationFrame(this.game_loop.bind(this));
};

Game.prototype.update = function () {
    'use strict';
    var now = Date.now();
    var delta = now - this.last_frame;
    this.last_frame = now;
    this.fps = this.calculate_fps(now);

    // TODO: Abstract this input stuff
    if (this.input.is_key_down(Keys.RIGHT)) {
        this.player.add_motion(90, this.player.speed);
    }
    if (this.input.is_key_down(Keys.LEFT)) {
        this.player.add_motion(270, this.player.speed);
    }
    if (this.input.is_key_down(Keys.UP)) {
        this.player.add_motion(0, this.player.speed);
    }
    if (this.input.is_key_down(Keys.DOWN)) {
        this.player.add_motion(180, this.player.speed);
    }

    for (var entity in this.entities) {
        if (this.entities.hasOwnProperty(entity)) {
            this.entities[entity].update();
        }
    }
};

Game.prototype.calculate_fps = function (now) {
    'use strict';
    var fps;
    this.frame_count++;
    if (now - this.tick_time >= 1000) {
        fps = this.frame_count;
        this.tick_time = now;
        this.frame_count = 0;
    } else {
        fps = this.fps;
    }
    return fps;
};

Game.prototype.draw = function () {
    'use strict';

    this.clear_canvas();

    // Horrible block of testing stuff
    // TODO: Remove it all
    var start = this.player.position;
    var mouse = this.input.get_mouse_position();
    var how_far = Math.floor(MathUtils.get_distance(start, mouse));

    var angle = MathUtils.get_angle_of_line(start, mouse);
    var steps = Math.ceil(how_far / 27);
    var distance = how_far / steps;
    var sin = Math.sin(angle) * distance;
    var cos = Math.cos(angle) * distance;

    var img = new Image();
    img.src = './assets/arm.png';

    for (var i = 0; i <= steps; i++) {
        this.context.save();
        this.context.translate(start.x + (i * sin), start.y + (i * cos));
        this.context.rotate(-angle);
        this.context.drawImage(img, 0, 0);
        this.context.restore();
    }
    // End horrible block of testing stuff


    for (var entity in this.entities) {
        if (this.entities.hasOwnProperty(entity)) {
            this.entities[entity].draw(this.context);
        }
    }
};

Game.prototype.clear_canvas = function () {
    'use strict';

    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
};

module.exports = Game;
