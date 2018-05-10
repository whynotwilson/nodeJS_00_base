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

