var EventEmitter = require('events').EventEmitter,
    objectAssign = require('react/lib/Object.assign'),
    fs = require('fs'),
    _ = require('lodash');

var CHANGE_EVENT = 'change',
    appsDir = "../../../resources/data";

var store = {hi: "test"};

var loadStore = function(callback) {
  fs.readdir(appsDir, function(err, list) {
    if (err) {
      throw err;
    }

    for (var i = 0; i < list.length; i++) {
      (function(i) {
        addApp(list[i], function() {
          if (i === list.length - 1) {
            callback();
          }
        });
      })(i);
    }
  });
}

var addApp = function(file, callback) {
  var path = appsDir + "/" + file;
  fs.readFile(path, "utf8", function(err, data) {
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
    this.on(CHANGE_EVENT, callback);
    // loadStore(function() {
    //   this.on(CHANGE_EVENT, callback);
    // });
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getStore: function() {
    return store;
  }
});

module.exports = todoStore;
