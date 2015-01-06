module.exports = {
    'get_distance': function (start, target) {
        'use strict';
        var xs = target.x - start.x;
        xs *= xs;
        var ys = target.y - start.y;
        ys = ys * ys;
        return Math.sqrt(xs + ys);
    },
    'get_angle_of_line': function (start, target) {
        'use strict';
        return Math.atan2(target.x - start.x, target.y - start.y);
    }
};
