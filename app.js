/*
2.全域變數、全局對象
https://nodejs.org/dist/latest-v9.x/docs/api/globals.html
*/


/*
3.回調函數
function callFunction(fun, name) {
    fun(name);
};

callFunction(function(name){
    console.log(name);
},'test');
*/


/*
//4.模塊 module
var stuff = require('./count');
console.log(stuff.counter(['ruby', 'js' , 'java']));
console.log(stuff.sum(1));
*/

/*
//5.事件 

var events = require('events');
var util = require('util');

var Person = function(name) {
    this.name = name
}

util.inherits(Person, events.EventEmitter);

var xiaoming = new Person('xiaoming');
var lili = new Person('lili');
var lucy = new Person('lucy');
var test = new Person('test');


var person = [xiaoming, lili, lucy];//array 裡沒有 test變數

person.forEach(function(person) { //test 變數未註冊 speak 事件
    person.on('speak', function(message) {
        console.log(person.name + " said: " + message);
    })
})

xiaoming.emit('speak', 'hi');
lucy.emit('speak', 'I want a curry');
test.emit('speak', 'hello');//未註冊，所以無法調用

// var myEmitter = new events.EventEmitter();

// myEmitter.on('someEvent', function(message) {
//     console.log(message);
// })

// myEmitter.emit('someEvent', 'the event was emitted');
*/


/*
//6.讀取、寫入，同步、異步
//同步：一行一行執行，如果有一行要很久，伺服器就會等在那，等到執行完該行才會執行下面的程式碼
//異步：

var fs = require('fs');

//Sync 是同步，如讀取很久，伺服器會卡住
//因為是同步(一行一行執行)，所以會先印出 readMe.txt 裡面的內容之後再印出 finished!
var readMe = fs.readFileSync('./readMe.txt', 'utf-8');
console.log(readMe);
console.log('finished!');


//在使用異步的時候都要加上回調函數，告知主線程已執行完畢
//第80行程式碼會在事件隊列註冊一個事件，告訴事件隊列，我將讀取一個文件，讀取完成後等到主線程空了，再執行回調函數
var readMe = fs.readFile('./readMe.txt','utf-8',function(err, data){
    console.log(data)
});
console.log('finished!');
*/



//7.創建和刪除目錄
/*
//複製readMe.txt 到 test 資料夾底下
var fs = require('fs');
fs.mkdir('test', function() {//首先創建 test 資料夾
    fs.readFile('readMe.txt' , 'utf8', function(err, data){ //讀取檔案，資料存進 data 參數
        fs.writeFile('./test/writeMe.txt' , data , function(){//寫入檔案，路徑要寫對
            console.log('File copy successfully');
        });
    });
});

//刪除目錄
//fs.rmdirSync('test');
*/


/*
//8.流和管道
//好處1；處理數據
//好處2：提高性能
//在7.中，如果讀取的檔案很大時，效能會很差，使用流可以一邊讀取數據一邊處理數據，進而提高性能
//流是個事件實例，所以它擁有事件特性，比如說：可以綁定一個監聽函數

// var fs = require('fs');

// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');


// var writeData = 'hello world';
// myWriteStream.write(writeData);
// myWriteStream.end();
// myWriteStream.on('finish' , function(){
//     console.log('finished');
// });

//myReadStream.pipe(myWriteStream); //讀取 readMe.txt 後寫入 writeMe.txt
*/

/*
//9.web 伺服器 part 1 介紹

var http = require('http');
var server = http.createServer(function(req, res){
    
    console.log('request received')
    res.writeHead(200 , {'Content-type': 'text/plain'});
    res.end('Hello from out application');

});

server.listen(5000);
*/

/*
//10. web 伺服器 part 2 響應 json 格式
var http = require('http');
var server = http.createServer(function(req, res){
    
    console.log('request received')

    var obj = {
        name : 'Willson',
        age : 28,
        job : 'preprogrammer'
    }
    res.writeHead(200 , {'Content-type': 'application/json'});
    res.end(JSON.stringify(obj));

});

server.listen(5000);
*/


/*
//11.web 伺服器 part 3 響應 html 頁面
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    
    res.writeHead(200, {'Content-Type':'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/index.html' ,'utf8');
    myReadStream.pipe(res);

});

server.listen(5000);
*/

/*
//12.web 伺服器 part 4 用模塊化思想組織程式碼

    function startServer (){

        var http = require('http');
        var fs = require('fs');
        var server = http.createServer(function(req, res){
            res.writeHead(200, {'Content-Type':'text/html'});
            var myReadStream = fs.createReadStream(__dirname + '/index.html' ,'utf8');
            myReadStream.pipe(res);
        });
        server.listen(5000);
    }

    //將程式碼移到 function 內，再用 export 導出，之後再用 require 導入就可使用
    //https://www.rails365.net/movies/qing-song-node-js-ji-chu-12-web-fu-wu-qi-part-4-mo-kuai-hua-si-xiang-zu-zhi-dai-ma-dai-ma
    export.startServer = startServer;

    //使用方法
    var server = require('./server');
    server.startServer();

*/

/*
//13. web 伺服器 part 5 路由
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){

    if(req.url === '/' || req.url === '/home'){
        res.writeHead(200, {'Content-Type':'text/html'});
        var myReadStream = fs.createReadStream(__dirname + '/index.html' ,'utf8').pipe(res);
    }else if(req.url === '/review'){
        res.writeHead(200, {'Content-Type':'text/html'});
        var myReadStream = fs.createReadStream(__dirname + '/review.html' ,'utf8').pipe(res);
    }else{
        res.writeHead(404, {'Content-Type':'text/html'});
        var myReadStream = fs.createReadStream(__dirname + '/404.html' ,'utf8').pipe(res);
    }
    
});

server.listen(5000);
*/

/*
//14. web 伺服器 part 6 重構路由程式碼
//將程式碼分開，分為
//一.app        主程式
//二.router     路由
//三.handler    路由的方法

var router = require('./router');
var handler = require('./handler');
var server = require('./server');

var handle = {};
handle['/'] = handler.home;
handle['/home'] = handler.home;
handle['/review'] = handler.review;

server.startServer(router.route , handle);
console.log('Node Server is running on port 5000......');

//1.開啟伺服器 startServer
//2.讀取 Request ，找出路由
//3.根據路由到 handler.js 執行不同 function，比如 index.html || review.html || 404 not found
//4.設定 res 的 狀態及格式，然後回應
    //res.writeHead(200, {'Content-Type':'text/html'});
    //var myReadStream = fs.createReadStream(__dirname + '/review.html' ,'utf8').pipe(res);
*/


//15. web 伺服器 part 7 使用 POST 或 GET 請求發送數據
//POST 如要修改數據，應使用 POST
//GET  查詢用，因資料會顯示在網址列，不安全
var router = require('./router');
var handler = require('./handler');
var server = require('./server');

var handle = {};
handle['/'] = handler.home;
handle['/home'] = handler.home;
handle['/review'] = handler.review;
handle['/movie'] = handler.movie;

server.startServer(router.route , handle);
console.log('Node Server is running on port 5000......');

/*
//17.package.json

$ npm init                      //初始化
$ npm install --save express    //會將安裝的包更新到 dependencies ，讓使用者很清楚了解安裝了哪些
$ npm install --save-dev gulp   //會將安裝的包更新到 -dev ，開發者模式
$ npm run start                 //使用者入口 scripts 設定    ex:"start" : "nodemon app.js"
$ npm install                   //自動安裝作者有使用的包

https://www.rails365.net/movies/qing-song-node-js-ji-chu-17-package-json-wen-jian
*/

