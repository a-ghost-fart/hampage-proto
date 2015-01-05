var GameObject = require('./GameObject');
var ProgressBar = require('../util/ProgressBar');
var Point = require('../util/Point');

Player.prototype = new GameObject();
Player.prototype.constructor = Player;

function Player() {
    'use strict';
    GameObject.call(this);
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
