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

// Vue.js应用程序
var app = new Vue({
  el: "#app",
  data: {
    newItem: "",
    items: [],
  },
  methods: {
    addItem: function() {
      if (this.newItem.trim() !== "") {
        var transaction = db.transaction(["items"], "readwrite");
        var objectStore = transaction.objectStore("items");

        var newItem = { text: this.newItem, editing: false };
        var request = objectStore.add(newItem);

        request.onsuccess = function(event) {
          console.log("New item added to database with ID: " + event.target.result);
          newItem.id = event.target.result;
        };

        transaction.oncomplete = function() {
          app.items.push(newItem);
          app.newItem = "";
        };
      }
    },

    editItem: function(index) {
      this.items[index].editing = true;
    },

    saveItem: function(index) {
      var item = this.items[index];

      var transaction = db.transaction(["items"], "readwrite");
      var objectStore = transaction.objectStore("items");

      var request = objectStore.put(item);

      request.onsuccess = function(event) {
        console.log("Item updated in database with ID: " + item.id);
      };

      transaction.oncomplete = function() {
        item.editing = false;
      };
    },

    deleteItem: function(index) {
      var item = this.items[index];

      var transaction = db.transaction(["items"], "readwrite");
      var objectStore = transaction.objectStore("items");

      var request = objectStore.delete(item.id);

      request.onsuccess = function(event) {
        console.log("Item deleted from database with ID: " + item.id);
      };

      transaction.oncomplete = function() {
        app.items.splice(index, 1);
      };
    },
  },
});

// 读取已有的数据
function readData() {
  var objectStore = db.transaction("items").objectStore("items");

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;

    if (cursor) {
      app.items.push(cursor.value);
      cursor.continue();
    }
  };
}
