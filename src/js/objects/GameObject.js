var Point = require('../util/Point');

function GameObject() {
    'use strict';
    this.position = new Point(0, 0);
}

GameObject.prototype.update = function () {
    'use strict';
};

GameObject.prototype.draw = function (context) {
    'use strict';
};

module.exports = GameObject;
