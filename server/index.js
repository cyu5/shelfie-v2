const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const controller = require("../db/controller");

app.set("port", process.env.PORT || 4000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	res.setHeader("Pragma", "no-cache");
	res.setHeader("Expires", "0");
	next();
});

app
	.route(`/api/inventory`)
	.get(controller.get)
	.post(controller.add)
	.put(controller.put)
	.delete(controller.delete);

app.listen(app.get("port"), () =>
	console.log(`Server is listening at port ${app.get("port")}!`)
);
