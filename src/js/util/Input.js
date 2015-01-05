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
