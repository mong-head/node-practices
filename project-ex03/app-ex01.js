/**
 * npm module
 * 
 * module package : local deployment
 * npm i ..\mong-math 한 상태
 * 
 * douzone-busan-math.js module test
 */

const mongMath = require('douzone-busan-math');
console.log(mongMath.sum(1,2,3));
console.log(mongMath.max(1,2,3));
console.log(mongMath.min(1,2,3));