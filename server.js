var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');


function startServer (route, handle){       //1.開啟伺服器 startServer

    var onRequest = function(req, res){     //2.讀取 Request ，找出路由
        var pathname = url.parse(req.url,).pathname;
        console.log('Request receive ' + pathname);
    
        var data = [];
        req.on('error', function(err){

            console.error(err);
        }).on('data',function(chunk){
            data.push(chunk);
        }).on('end', function(){

            if(req.method === 'POST'){
                if(data.length > 1e6){
                    res.connection.destroy();
                }
                data = Buffer.concat(data).toString();
                route(handle, pathname, res, querystring.parse(data));    //3.根據路由到 handler.js 執行不同 function，比如 index.html || review.html || 404 not found
            }else{
                var params = url.parse(req.url, true).query; //true 表示為 obj  false 為字串
                route(handle, pathname, res, params); 
            }
        });
    }

    var server = http.createServer(onRequest);
    server.listen(5000);
}

//將程式碼移到 function 內，再用 export 導出，之後再用 require 導入就可使用
//https://www.rails365.net/movies/qing-song-node-js-ji-chu-12-web-fu-wu-qi-part-4-mo-kuai-hua-si-xiang-zu-zhi-dai-ma-dai-ma
module.exports.startServer = startServer;