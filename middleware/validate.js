function parseField(field) {
	return field
		.split(/\[|\]/)
		.filter(s => s);
}

function getField(req, field) {
	var val = req.body;

	field.forEach(prop => {
		val = val[prop];
	})

	return val;
}

exports.required = field => {
	field = parseField(field);

	return (req, res, next) => {
		if(getField(req, field)) {
			next();
		} else {
			res.send(`${field.join(" ")} is required.`);
			res.redirect("back");
		}
	}
}

exports.lengthAbove = (field, len) => {
	field = parseField(field);

	return (req, res, next) => {
		if(getField(req, field).length > len) {
			next();
		} else {
			var fields = field.join(" ");

			res.send(`${fields} must have more than ${len} characters.`);
			res.redirect("back");
		}
	}
}