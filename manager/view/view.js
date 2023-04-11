// 获取URL中的参数
const urlParams = new URLSearchParams(window.location.search);

var edit = urlParams.get("edit")
var mode = parseInt(urlParams.get("mode"))
var list = []

var db;

// 打开数据库
var request = window.indexedDB.open("myDatabase", 1);

request.onerror = function(event) {
    console.log("Database error: " + event.target.errorCode);
  };
  
  request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database opened successfully");
    readData(); // 读取数据库中已有的数据
  };
  
  request.onupgradeneeded = function(event) {
    db = event.target.result;
    console.log("Database upgrade needed");
  
    // 创建对象仓库
    var objectStore = db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
  
    // 添加索引
    objectStore.createIndex("text", "text", { unique: false });
  };


var app = new Vue({
    el: '#app',
    data: {
        title: Mode.title(mode),
        buttonList: list,
    },
    methods: {
        
    },
});

// 读取已有的数据
function readData() {
    var objectStore = db.transaction("items").objectStore("items");
  
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
  
      if (cursor) {
        list.push(cursor.value);
        cursor.continue();
      }
    };
  }
