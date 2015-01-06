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
    this.speed = 4;
}

module.exports = Player;
