const fs = require("fs");
const uuid = require("uuid");

const DATA_FILE = "./inventory.json";

module.exports = {
	get(req, res, next) {
		fs.readFile(DATA_FILE, (err, data) => {
			res.setHeader("Cache-Control", "no-cache");
			res.json(JSON.parse(data));
		});
	},

	add(req, res, next) {
		fs.readFile(DATA_FILE, (err, data) => {
			const inventory = JSON.parse(data);
			const newProduct = {
				id: uuid.v4(),
				image: req.body.image,
				name: req.body.name,
				price: req.body.price
			};
			inventory.push(newProduct);
			fs.writeFile(DATA_FILE, JSON.stringify(inventory, null, 4), () => {
				res.setHeader("Cache-Control", "no-cache");
				res.json(inventory);
			});
		});
	},

	put(req, res, next) {
		fs.readFile(DATA_FILE, (err, data) => {
			const inventory = JSON.parse(data);
			for (let product of inventory) {
				if (product.id === req.body.id) {
					product.image = req.body.image;
					product.name = req.body.name;
					product.price = req.body.price;
				}
			}
			fs.writeFile(DATA_FILE, JSON.stringify(inventory, null, 4), () => {
				res.setHeader("Cache-Control", "no-cache");
				res.json(inventory);
			});
		});
	},

	delete(req, res, next) {
		fs.readFile(DATA_FILE, (err, data) => {
			const inventory = JSON.parse(data).filter(
				product => product.id !== req.body.id
			);

			fs.writeFile(DATA_FILE, JSON.stringify(inventory, null, 4), () => {
				res.setHeader("Cache-Control", "no-cache");
				res.json(inventory);
			});
		});
	}
};
