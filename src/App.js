import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    inventory: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1508921108053-9f757ead871c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        name: "friend",
        price: 5
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1508921108053-9f757ead871c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        name: "girlfriend",
        price: 5
      }
    ],
    newProductForm: {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1508921108053-9f757ead871c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
      name: "monkey friend",
      price: 500
    }
  };

  countId = 4;

  handleEdit = id => {
    const product = this.state.inventory.find(product => {
      return product.id === id;
    });
    this.setState({ ...this.state, newProductForm: product });
  };

  handleDelete = id => {
    this.setState({
      ...this.state,
      inventory: this.state.inventory.filter(product => {
        return product.id !== id;
      })
    });
  };

  handleSubmit = _ => {
    let inventory = [...this.state.inventory];
    const id = this.state.newProductForm.id;
    if (id) {
      inventory = inventory.map(product => {
        if (product.id === id) {
          return this.state.newProductForm;
        } else return product;
      });
    } else {
      inventory.push({ ...this.state.newProductForm, id: this.countId++ });
    }

    this.setState({ ...this.state, inventory });
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
