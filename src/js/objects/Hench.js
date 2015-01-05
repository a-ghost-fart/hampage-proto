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
