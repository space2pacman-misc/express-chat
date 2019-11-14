var Entry = require("../models/entry");

exports.form = (req, res) => {
	res.render("post", { 
		title: "Post" 
	});
}

exports.submit = (req, res, next) => {
	var data = req.body.entry;

	if(!data.title) {
		res.error("Title is required.");
		res.redirect("back");

		return;
	}

	if(data.title.length < 4) {
		res.error("Title must be longer than 4 characters.");
		res.redirect("back");

		return;
	}

	var user = res.locals.user;
	var username = user ? user.name : null;
	var entry = new Entry({
		username: username,
		title: data.title,
		body: data.body
	});

	entry.save(err => {
		if(err) return next(err);

		res.redirect("/");
	})
}

exports.list = (req, res, next) => {
	Entry.getRange(0, -1, (err, entries) => {
		if(err) return next(err);

		res.render("entries", {
			title: "Entries",
			entries: entries
		})
	});
}