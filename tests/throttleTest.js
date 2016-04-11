/**
 * Developer: BelirafoN
 * Date: 08.04.2016
 * Time: 16:03
 */

"use strict";

const assert = require('assert');
const throttle = require('../src/throttle');

describe('Throttle decorator functionality', () => {
    let callCounter = 0,
        handlerCounter = 0;

    function runner(count, delay, callback, context){
        let promise = Promise.resolve(0);

        for(let stepIndex = 0; stepIndex < count; stepIndex++){
            promise = promise.then(() => new Promise(resolver => {
                setTimeout(() => {
                    callback && callback.apply(context || this);
                    callCounter++;
                    resolver();
                }, delay);
            }));
        }

        return promise;
    }

    beforeEach(() => {
        callCounter = 0;
        handlerCounter = 0;
    });

    it('Save context for decorated handler', done => {
        let testObj = {};
        throttle(6, function(){
            if(this === testObj){
                done();
            }
        }, testObj)();
    });

    it('Decorated handler gets call arguments', done => {
        let controlValue = Date.now();
        function handler(param){
            if(param === controlValue){
                done();
            }
        }
        throttle(6, handler)(controlValue);
    });

    it('Trottling calls: 10 calls -> 3 fire', done => {
        runner(10, 1, throttle(6, () => { handlerCounter++; }))
            .then(() => {
                if(callCounter === 10 && handlerCounter >= 2 && handlerCounter <= 3){ done(); }
            });
    });

});