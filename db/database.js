const admin = require("firebase-admin");
const serviceAccount = require(__dirname +
	"/shelfie-85c5f-firebase-adminsdk-br80x-7c5fb9116f.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const inventoryRef = db.collection("inventory");

module.exports = {
	async getInventory(success) {
		try {
			return inventoryRef
				.get()
				.then(function(querySnapshot) {
					const inventory = [];
					querySnapshot.forEach(function(doc) {
						inventory.push({ ...doc.data(), id: doc.id });
					});
					return inventory;
				})
				.then(success);
		} catch (err) {
			console.log("Error getting documents", err);
		}
	},

	pollInventory(success) {
		return inventoryRef.onSnapshot(
			querySnapshot => {
				console.log(`Received query snapshot of size ${querySnapshot.size}`);
			},
			err => {
				console.log(`Encountered error: ${err}`);
			}
		);
	},

	async addProduct(attr) {
		const { image, price, name } = attr;
		try {
			const ref = await inventoryRef.add({
				image,
				price,
				name
			});
			console.log("Added document with ID: ", ref.id);
			return ref;
		} catch (err) {
			return console.log("Error adding product: ", err);
		}
	},

	async deleteProduct(id) {
		try {
			return await inventoryRef.doc(id).delete();
		} catch (err) {
			console.log("Error deleting product: ", err);
		}
	},

	modifyProduct(attrs) {
		const { id, name, price, image } = attrs;
		return inventoryRef
			.doc(id)
			.set({ name, price, image })
			.catch(err => {
				console.log("Error modifying product: ", err);
			});
	}
};
