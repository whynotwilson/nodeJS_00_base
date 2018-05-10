var counter = function(arr){
    return 'There are ' + arr.length + ' elements in the array' ;
};

var pi = 3.14;

var sum = function(a){
    return `The sum of 2 number is ${a+pi}`;
}

// module.exports.counter = counter;
// module.exports.pi = pi;
// module.exports.sum = sum;

module.exports = {
    counter : function(arr){
        return 'There are ' + arr.length + ' elements in the array' ;
    },

    sum : sum
}