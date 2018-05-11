var http = require('http');
var fs = require('fs');

function startServer (route, handle){

    var onRequest = function(req, res){
        console.log('Request receive ' + req.url);
        route(handle, req.url, res);
    }

    var server = http.createServer(onRequest);
    server.listen(5000);
}

//將程式碼移到 function 內，再用 export 導出，之後再用 require 導入就可使用
//https://www.rails365.net/movies/qing-song-node-js-ji-chu-12-web-fu-wu-qi-part-4-mo-kuai-hua-si-xiang-zu-zhi-dai-ma-dai-ma
module.exports.startServer = startServer;