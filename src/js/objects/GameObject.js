var Point = require('../util/Point');
var MathUtils = require('../util/MathUtils');
var Constants = require('../conf/Constants');

function GameObject() {
    'use strict';
    this.position = new Point(0, 0);
    this.velocity = new Point(0, 0);
    this.friction = 0.98;
}

GameObject.prototype.update = function () {
    'use strict';
    this.position.x += this.velocity.x * this.friction;
    this.position.y += this.velocity.y * this.friction;

};

GameObject.prototype.draw = function (context) {
    'use strict';
    context.fillStyle = '#fff';
    context.fillRect(this.position.x, this.position.y, 32, 32);

    this.bar.draw(context);
};

module.exports = GameObject;
