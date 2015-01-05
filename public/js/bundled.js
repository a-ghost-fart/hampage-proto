(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    'UP': 87,
    'DOWN': 83,
    'LEFT': 65,
    'RIGHT': 68,
    'ACTION': 32
};

},{}],2:[function(require,module,exports){
var Player = require('../objects/Player');
var Hench = require('../objects/Hench');
var Input = require('../util/Input');
var Keys = require('../conf/Keys');

function Game() {
    'use strict';
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

    this.input = new Input();

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

    for (var entity in this.entities) {
        if (this.entities.hasOwnProperty(entity)) {
            this.entities[entity].update();
        }
    }
};

Game.prototype.draw = function () {
    'use strict';

    this.clear_canvas();

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

},{"../conf/Keys":1,"../objects/Hench":5,"../objects/Player":6,"../util/Input":7}],3:[function(require,module,exports){
var Game = require('./core/Game');

window.onload = function () {
    'use strict';
    window.g = new Game();
};

},{"./core/Game":2}],4:[function(require,module,exports){
var Point = require('../util/Point');

function GameObject() {
    'use strict';
    this.position = new Point(0, 0);
}

GameObject.prototype.update = function () {
    'use strict';
};

GameObject.prototype.draw = function (context) {
    'use strict';
};

module.exports = GameObject;

},{"../util/Point":8}],5:[function(require,module,exports){
var GameObject = require('./GameObject');
var Point = require('../util/Point');
var ProgressBar = require('../util/ProgressBar');

Hench.prototype = new GameObject();
Hench.prototype.constructor = Hench;

function Hench() {
    'use strict';
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

Hench.prototype.draw = function (context) {
    'use strict';

    context.fillStyle = '#fff';
    context.fillRect(this.position.x, this.position.y, 32, 32);

    this.bar.draw(context);
};

module.exports = Hench;

},{"../util/Point":8,"../util/ProgressBar":9,"./GameObject":4}],6:[function(require,module,exports){
var GameObject = require('./GameObject');
var ProgressBar = require('../util/ProgressBar');
var Point = require('../util/Point');

Player.prototype = new GameObject();
Player.prototype.constructor = Player;

function Player() {
    'use strict';
    this.position = new Point(2, 36);
    this.bar = new ProgressBar(this.position, 100, 100, 'Ham Left');
}

Player.prototype.draw = function (context) {
    'use strict';

    context.fillStyle = '#fff';
    context.fillRect(this.position.x, this.position.y, 32, 32);

    this.bar.draw(context);
};

module.exports = Player;

},{"../util/Point":8,"../util/ProgressBar":9,"./GameObject":4}],7:[function(require,module,exports){
function Input() {
    'use strict';
    this.pressed = [];

    document.addEventListener('keyup', this.keyup.bind(this), false);
    document.addEventListener('keydown', this.keydown.bind(this), false);
}

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

},{}],8:[function(require,module,exports){
function Point(x, y) {
    'use strict';
    this.x = x;
    this.y = y;
}

module.exports = Point;

},{}],9:[function(require,module,exports){
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

},{"./Point":8}]},{},[3])