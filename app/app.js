'use strict';

var db = require('./app/model/settings.js');

db.save({
	"timeot": 500,
	"hash": 700,
	"test": "bla"
});

db.save({
	"timeot": 500,
	"hash": 700,
	"test": "bla"
});

console.log(db.find());
