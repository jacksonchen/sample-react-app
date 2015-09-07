var EventEmitter = require('events').EventEmitter,
    objectAssign = require('react/lib/Object.assign'),
    obj = require('../../../resources/data/com.facebook.katana-258882'),
    _ = require('lodash');

var CHANGE_EVENT = 'change',
    appsDir = "/dist";

var store = {};

var loadStore = function() {
  keyName = obj["n"] + "-" + obj["verc"];
  store[keyName] = obj;
  console.log(store)
  // fs.readdir(appsDir, function(err, list) {
  //   if (err) {
  //     throw err;
  //   }

  //   for (var i = 0; i < list.length; i++) {
  //     (function(i) {
  //       console.log(i)
  //       addApp(list[i], function() {
  //         if (i === list.length - 1) {
  //           callback();
  //         }
  //       });
  //     })(i);
  //   }
  // });
}

var addApp = function(file, callback) {
  var path = appsDir + "/" + file;
  console.log("path")
  fs.readFile(path, "utf8", function(err, data) {
    console.log("path")
    if (err) {
      throw err;
    }
    var obj = JSON.parse(data),
        keyName = obj["n"] + "-" + obj["verc"];
    store[keyName] = obj;
    callback();
  })
}

var removeApp = function(file, callback) {
  var key = file;
  delete store[key];
  callback();
}

var todoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    loadStore();
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getStore: function() {
    return store;
  }
});

module.exports = todoStore;
