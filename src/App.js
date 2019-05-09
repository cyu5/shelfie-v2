import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import client from "./client";

class App extends Component {
	state = {
		inventory: [],
		newProductForm: {}
	};

	componentDidMount() {
		setInterval(() => {
			this.refreshInventory();
		}, 1000);
	}

	refreshInventory() {
		client.getInventory(res => {
			this.setState({
				...this.state,
				inventory: res
			});
		});
	}

	handleEdit = id => {
		const product = this.state.inventory.find(product => {
			return product.id === id;
		});
		this.setState({ ...this.state, newProductForm: product });
	};

	handleDelete = id => {
		client.deleteProduct(id);
	};

	handleSubmit = _ => {
		const product = this.state.newProductForm;
		product.id ? client.modifyProduct(product) : client.addProduct(product);
	};

	handleFormChange = (field, value) => {
		// console.log(`Change ${field} to ${value}`);
		this.setState({
			...this.state,
			newProductForm: { ...this.state.newProductForm, [field]: value }
		});
	};

	clearForm = _ => {
		this.setState({
			...this.state,
			newProductForm: { id: null, image: "", name: "", price: 0 }
		});
	};

	render() {
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route
						exact
						path="/"
						render={_ => (
							<Dashboard
								inventory={this.state.inventory}
								onDelete={this.handleDelete}
								onEdit={this.handleEdit}
							/>
						)}
					/>
					<Route
						path="/form"
						render={_ => (
							<Form
								form={this.state.newProductForm}
								onSubmit={this.handleSubmit}
								onInputChange={this.handleFormChange}
								onClearForm={this.clearForm}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
