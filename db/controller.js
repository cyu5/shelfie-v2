var db = require("./database");

module.exports = {
	get(req, res, next) {
		db.getInventory(data => {
			res.setHeader("Cache-Control", "no-cache");
			res.json(data);
		});
	},

	add(req, res, next) {
		const { name, image, price } = req.body;
		db.addProduct({ name, image, price }).then(() => res.send(req.body));
	},

	put(req, res, next) {
		const { id, name, image, price } = req.body;
		db.modifyProduct({ id, name, image, price }).then(() =>
			res.sendStatus(200)
		);
	},

	delete(req, res, next) {
		db.deleteProduct(req.body.id).then(() => res.sendStatus(200));
	}
};
