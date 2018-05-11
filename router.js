var fs = require('fs');

function route (handle,pathname,res) {
    console.log('Routing a request for ' + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname]();
    }else{
        res.writeHead(404, {'Content-Type':'text/html'});
        var myReadStream = fs.createReadStream(__dirname + '/404.html' ,'utf8').pipe(res);
    }
}

module.exports.route = route;
