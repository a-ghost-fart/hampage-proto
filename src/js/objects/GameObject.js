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

    this.position.x += this.velocity.x + (this.velocity.x * this.friction);
    this.position.y += this.velocity.y + (this.velocity.y * this.friction);

    if (this.position.x >= 640) {
        this.position.x = 640;
    } else if (this.position.x <= 5) {
        this.position.x = 5;
    }
    if (this.position.y >= 480) {
        this.position.y = 480;
    } else if (this.position.y <= 2) {
        this.position.y = 2;
    }
};

GameObject.prototype.draw = function (context) {
    'use strict';
    context.fillStyle = '#fff';
    context.fillRect(this.position.x, this.position.y, 32, 32);

    this.bar.draw(context);
};

module.exports = GameObject;
