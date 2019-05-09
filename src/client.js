export default {
	async getInventory(success) {
		const response = await fetch("/api/inventory", {
			headers: {
				Accept: "application/json"
			}
		});
		const response_1 = await checkStatus(response);
		const response_2 = await parseJSON(response_1);
		return success(response_2);
	},

	addProduct(attr) {
		return fetch("/api/inventory", {
			method: "post",
			body: JSON.stringify(attr),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		}).then(checkStatus);
	},

	modifyProduct(product) {
		return fetch("/api/inventory", {
			method: "put",
			body: JSON.stringify(product),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		}).then(checkStatus);
	},

	deleteProduct(id) {
		return fetch("/api/inventory", {
			method: "delete",
			body: JSON.stringify({ id }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		}).then(checkStatus);
	}
};

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`HTTP Error ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		console.log(error);
		throw error;
	}
}

function parseJSON(response) {
	return response.json();
}
