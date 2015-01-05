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
