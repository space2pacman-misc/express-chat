module.exports = (cb, perpage) => {
	perpage = perpage || 10;

	return (req, res, next) => {
		var page = Math.max(parseInt(req.params.id || "1", 10)) - 1;

		cb((err, total) => {
			if(err) return next(err);

			req.page = res.locals.page = {
				number: page,
				perpage: perpage,
				from: page * perpage,
				to: page * perpage + perpage + 1,
				total: total,
				count: Math.ceil(total / perpage)
			}
			next();
		})
	}
}