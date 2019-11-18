var Entry = require("../models/entry");
var auth = require("basic-auth");
var express = require("express");
var User = require("../models/user");

exports.auth = (req, res, next) => {
	var { name, pass } = auth(req);

	User.authenticate(name, pass, (err, user) => {
		if(user) req.remoteUser = user;

		next(err);
	})
}

exports.user = (req, res, next) => {
	User.get(req.params.id, (err, user) => {
		if(err) return next(err);
		if(!user.id) return res.sendStatus(404);

		res.json(user);
	})
}

exports.entries = (req, res, next) => {
	var page = req.page;

	Entry.getRange(page.from, page.to, (err, entries) => {
		if(err) return next(err);

		res.format({
			json: () => {
				res.send(entries);
			},
			xml: () => {
				res.render("entries/xml", {
					entries: entries
				})
			}
		})
	})
}