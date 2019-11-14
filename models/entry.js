var redis = require("redis");
var db = redis.createClient();

class Entry {
	constructor(obj) {
		for(var key in obj) {
			this[key] = obj[key];
 		}
	}

	save(cb) {
		var entryJSON = JSON.stringify(this);

		db.lpush(
			"entries",
			entryJSON,
			err => {
				if(err) return cb(err);

				cb();
			}
		);
	}

	static getRange(from, to, cb) {
		db.lrange("entries", from, to, (err, items) => {
			if(err) return cb(err);

			var entries = [];

			items.forEach(item => {
				entries.push(JSON.parse(item));
			})
			cb(null, entries);
		})
	}
}

module.exports = Entry;