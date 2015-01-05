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

    for (var entity in this.entities) {
        if (this.entities.hasOwnProperty(entity)) {
            this.entities[entity].update();
        }
    }
};

Game.prototype.draw = function () {
    'use strict';

    this.clear_canvas();

    var start = this.player.position;
    var mouse = this.input.get_mouse_position();

    var xs = 0;
    var ys = 0;
    xs = mouse.x - start.x;
    xs = xs * xs;
    ys = mouse.y - start.y;
    ys = ys * ys;
    var how_far = Math.floor(Math.sqrt(xs + ys));

    var angle = Math.atan2(mouse.x - start.x, mouse.y - start.y);
    var steps = Math.floor(how_far / 30);
    var distance = how_far / steps;
    var sin = Math.sin(angle) * distance;
    var cos = Math.cos(angle) * distance;

    var img = new Image();
    img.src = '/assets/arm.png';

    this.context.strokeStyle = '#fff';

    for (var i = 1; i <= steps; i++) {
        this.context.save();
        this.context.translate(start.x + (i * sin), start.y + (i * cos));
        this.context.rotate(-angle);
        this.context.drawImage(img, 0, 0);
        this.context.restore();
    }


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