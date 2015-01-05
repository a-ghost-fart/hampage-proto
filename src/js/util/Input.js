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
