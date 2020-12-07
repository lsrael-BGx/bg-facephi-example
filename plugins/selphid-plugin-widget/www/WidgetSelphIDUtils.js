function typeOf(obj) {
    return {}.toString.call(obj).match(/\s(\w+)/)[1].toLowerCase();
}

/**
 * Checks if the type of the variable is correct.
 *
 * @method checkTypes
 */
function checkTypes(args, types) {
    args = [].slice.call(args);
    for (var i = 0; i < types.length; ++i) {
        if (typeOf(args[i]) != types[i]) {
            throw new TypeError('param ' + i + ' must be of type ' + types[i]);
        }
    }
}