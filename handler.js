var fs = require('fs');

function home (res){
    res.writeHead(200, {'Content-Type':'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/index.html' ,'utf8').pipe(res);
}

function review (res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/review.html' ,'utf8').pipe(res);
}

module.exports.home = home;
module.exports.review = review;