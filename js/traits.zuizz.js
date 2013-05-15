/*
 * Zuizz traits library
 *
 *
 */


var Zu = Zu || {};

/*
 * Debounce a function
 *
 * example:
 * var debounced = Zu.debounce(function(){self.setHeight();},500);
 * debounced();
 * $(window).bind("resize", function () {
 *    debounced();
 * });
 *
 * @method debounce
 * @return {function}
 * @param {function} func
 *      The callback function
 * @param {int} threshold
 *      The threshold
 * @param {bool} execAtBeginning
 *      Executes at beginning
 *
 */

Zu.debounce = function (func, threshold, execAtBeginning) {

    var timeout;
    return function debounced() {
        var obj = this, args = arguments;
        function delayed() {
            if (!execAtBeginning) {
                func.apply(obj, args);
            }
            timeout = null;
        }

        if (timeout) {
            clearTimeout(timeout);
        }
        else if (execAtBeginning) {
            func.apply(obj, args);
        }

        timeout = setTimeout(delayed, threshold || 500);
    };


};