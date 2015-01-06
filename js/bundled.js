(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    'FRICTION': 1
};

},{}],2:[function(require,module,exports){
module.exports = {
    'UP':       87, // W
    'DOWN':     83, // S
    'LEFT':     65, // A
    'RIGHT':    68, // D
    'ACTION':   32  // Space
};

},{}],3:[function(require,module,exports){
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

},{"../conf/Keys":2,"../objects/Hench":6,"../objects/Player":7,"../util/Input":8,"../util/MathUtils":9}],4:[function(require,module,exports){
var Game = require('./core/Game');

window.onload = function () {
    'use strict';
    window.g = new Game();
};

},{"./core/Game":3}],5:[function(require,module,exports){
var Point = require('../util/Point');
var MathUtils = require('../util/MathUtils');
var Constants = require('../conf/Constants');

function GameObject() {
    'use strict';
    this.position = new Point(0, 0);
}

GameObject.prototype.update = function () {};

GameObject.prototype.draw = function (context) {
    'use strict';
    context.fillStyle = '#fff';
    context.fillRect(this.position.x, this.position.y, 32, 32);

    this.bar.draw(context);
};

GameObject.prototype.add_motion = function (angle, speed) {
    'use strict';
    this.position.x += speed * (Math.cos(angle));
};

module.exports = GameObject;

},{"../conf/Constants":1,"../util/MathUtils":9,"../util/Point":10}],6:[function(require,module,exports){
var GameObject = require('./GameObject');
var Point = require('../util/Point');
var ProgressBar = require('../util/ProgressBar');

Hench.prototype = new GameObject();
Hench.prototype.constructor = Hench;

function Hench() {
    'use strict';
    GameObject.call(this);
    this.ham_recollection = 100;
    this.ham_care = -0.01;
    this.ham_recollection_max = 100;
    this.ham_recollection_min = 30;     // Hench can never not care about ham.

    this.position = new Point(2, 2);

    this.bar = new ProgressBar(this.position, 100, 20, 'Ham Lust');
}

Hench.prototype.update = function () {
    'use strict';
    this.ham_recollection = this.ham_recollection + this.ham_care;
    if (this.ham_recollection <= this.ham_recollection_min) {
        this.ham_recollection = this.ham_recollection_min;
    } else if (this.ham_recollection >= this.ham_recollection_max) {
        this.ham_recollection = this.ham_recollection_max;
    }

    this.bar.value = Math.floor(this.ham_recollection);
    this.bar.position = this.position;
};

module.exports = Hench;

},{"../util/Point":10,"../util/ProgressBar":11,"./GameObject":5}],7:[function(require,module,exports){
var GameObject = require('./GameObject');
var ProgressBar = require('../util/ProgressBar');
var Point = require('../util/Point');
var Constants = require('../conf/Constants');

Player.prototype = new GameObject();
Player.prototype.constructor = Player;

function Player() {
    'use strict';
    GameObject.call(this);
    this.position = new Point(2, 36);
    this.bar = new ProgressBar(this.position, 100, 100, 'Ham Left');
    this.accelleration = 0.1;
    this.speed = 4;
}

module.exports = Player;

},{"../conf/Constants":1,"../util/Point":10,"../util/ProgressBar":11,"./GameObject":5}],8:[function(require,module,exports){
var Point = require('./Point');

function Input(canvas) {
    'use strict';
    this.pressed = [];
    this.mouse_location = new Point(0, 0);

    canvas.addEventListener('mousemove', this.mouse_move.bind(this), false);
    document.addEventListener('keyup', this.keyup.bind(this), false);
    document.addEventListener('keydown', this.keydown.bind(this), false);
}

Input.prototype.mouse_move = function (event) {
    'use strict';
    this.mouse_location.x = event.clientX;
    this.mouse_location.y = event.clientY;
};

Input.prototype.get_mouse_position = function () {
    'use strict';
    return this.mouse_location;
};

Input.prototype.is_key_down = function (keycode) {
    'use strict';
    return this.pressed[keycode] || false;
};

Input.prototype.keyup = function (event) {
    'use strict';
    this.pressed[event.keyCode] = false;
};

Input.prototype.keydown = function (event) {
    'use strict';
    this.pressed[event.keyCode] = true;
};

module.exports = Input;

},{"./Point":10}],9:[function(require,module,exports){
module.exports = {
    'get_distance': function (start, target) {
        'use strict';
        var xs = target.x - start.x;
        xs *= xs;
        var ys = target.y - start.y;
        ys = ys * ys;
        return Math.sqrt(xs + ys);
    },
    'get_angle_of_line': function (start, target) {
        'use strict';
        return Math.atan2(target.x - start.x, target.y - start.y);
    }
};

},{}],10:[function(require,module,exports){
function Point(x, y) {
    'use strict';
    this.x = x;
    this.y = y;
}

module.exports = Point;

},{}],11:[function(require,module,exports){
var Point = require('./Point');

function ProgressBar(position, min, max, text) {
    'use strict';
    this.position = position;
    this.min = min;
    this.max = max;
    this.text = text;
    this.value = this.max;
    this.border_width = 2;
    this.width = 75;
    this.height = 10;
    this.offset = new Point(36, 2);
}

ProgressBar.prototype.draw = function (context) {
    'use strict';
    context.fillStyle = '#fff';
    context.fillRect(
        (this.position.x + this.offset.x) - this.border_width,
        (this.position.y + this.offset.y) - this.border_width,
        this.width + (this.border_width * 2),
        this.height + (this.border_width * 2)
    );

    context.fillStyle = '#f00';
    context.fillRect(
        this.position.x + this.offset.x,
        this.position.y + this.offset.y,
        this.calculate_width(),
        this.height
    );

    context.textAlign = 'center';
    context.fillStyle = '#000';
    context.fillText(this.text, this.position.x + (this.width / 2) + this.offset.x, this.position.y + 9 + this.offset.y);
};

ProgressBar.prototype.calculate_width = function () {
    'use strict';
    return Math.floor((this.width / 100) * this.value);
};

module.exports = ProgressBar;

},{"./Point":10}]},{},[4])