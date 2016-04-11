/**
 * Developer: BelirafoN
 * Date: 08.04.2016
 * Time: 16:03
 */

"use strict";

/**
 *
 * @param delay
 * @param callback
 * @param context
 * @returns {run}
 */
function throttle(delay, callback, context, lastCall){
    let isIdle = false,
        callParams = null;

    return function run(){

        if(isIdle){
            callParams = [context || this, arguments];
            return;
        }
        
        callback.apply(context || this, arguments);
        isIdle = true;

        setTimeout(() => {
            isIdle = false;
        if(callParams && lastCall){
            run.apply(...callParams);
        }
        callParams = null;
    }, delay);
    };
}

module.exports = throttle;