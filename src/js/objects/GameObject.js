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
