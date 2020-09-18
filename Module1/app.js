var lodash = require('lodash');

var output = lodash.without([1, 1, 2, 2, 3, 4], 1, 2);
console.log(output);