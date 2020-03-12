import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Header from './components/Header/header';
import Pizzas from './components/PizzaComponents/pizzas'
import Ingredients from './components/IngredientComponets/ingredients'
import PizzasService from "./repository/axiosPizzasRepository";
import IngredientsService from "./repository/axiosIngredientsRepository";
import IngredientEdit from './components/IngredientComponets/ingredientEdit';
import IngredientDetails from './components/IngredientComponets/ingredientsDetails';
import PizzaDetails from './components/PizzaComponents/pizzaDetails';
import PizzaEdit from './components/PizzaComponents/pizzaEdit';
import IngredientsAdd from './components/IngredientComponets/ingredientsAdd';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pizzas:{
                pizzasList: [{

                }],
                pageSize:2,
                page:0,
                totalPages:0
            },
            ingredients:{
                ingredientsList: [
                    {

                    }
                ],
                pageSize:4,
                page:0,
                totalPages:0
            }

        }
    }
    componentDidMount() {
    }

    /* ------------- INGREDIENTS METHODS --------------*/
    /* ------------- LOAD INGREDIENTS IN LIST --------------*/
    loadIngredients = (page=0) => {
        IngredientsService.fetchIngredientsPaged(page, this.state.ingredients.pageSize).then((data) => {
            this.setState({
                ingredients:{
                    ingredientsList: data.data.content,
                    page:data.data.number,
                    pageSize:data.data.numberOfElements,
                    totalPages:data.data.totalPages
                }
            })
        })
    }
    /* ------------- DELETE INGREDIENT FROM LIST --------------*/
    deleteIngredients = (ingredientId) => {
        debugger;
        IngredientsService.deleteIngredient(ingredientId).then((response)=>{
            this.setState((state) => {
                const ingredients = state.ingredients.ingredientsList.filter((i) => {
                    return i.id !== ingredientId;
                });
                return {
                    "ingredients":{
                        "ingredientsList":ingredients
                    }
                }
            })
        })
    }
    /* ------------- UPDATE INGREDIENT IN LIST --------------*/
    updateIngredients = ((editedIngredient) => {
        IngredientsService.updateIngredient(editedIngredient).then((response)=>{
            const newIngredient = response.data;
            this.setState((prevState) => {
                const newIngredientRef = prevState.ingredients.ingredientsList.map((ingredient)=>{
                    if (ingredient.id===newIngredient.id) {
                        return newIngredient;
                    }
                    return ingredient;
                });
                return {
                    "ingredients": {
                        "ingredientsList": newIngredientRef
                    }
                }

            });
        });
    });
    /* ------------- CREATE INGREDIENT --------------*/
    createIngredient = (newIngredient) => {
        IngredientsService.addIngredient(newIngredient).then((response)=>{
            const newIngredient = response.data;
            this.setState((prevState) => {
                const newIngredientRef = [...prevState.ingredients.ingredientsList, newIngredient];
                //or
                //const terms = prevState.terms.concat(newTerm);
                return {
                    "ingredients":{
                        "ingredientsList":newIngredientRef
                    }
                }
            });
        });
    }
    /* ------------- PIZZA METHODS --------------*/
    loadPizzas = (page=0) => {
        PizzasService.fetchPizzasPaged(page, this.state.pizzas.pageSize).then((data) => {
            this.setState({
                pizzas:{
                    pizzasList: data.data.content,
                    page:data.data.number,
                    pageSize:data.data.numberOfElements,
                    totalPages:data.data.totalPages
                }
            })
        })
    }
    deletePizzas = (ingerdientId) => {
        PizzasService.deletePizzaTerm(ingerdientId).then((response)=>{
            this.setState((state) => {
                const pizzas = state.pizzas.pizzasList.filter((i) => {
                    return i.id !== ingerdientId;
                });
                return {pizzas}
            })
        })
    }
    updatePizzas = ((editedPizza) => {
        PizzasService.updatePizzaTerm(editedPizza).then((response)=>{
            const newPizza = response.data;
            this.setState((prevState) => {
                const newPizzaRef = prevState.pizzas.pizzasList.map((pizza)=>{
                    if (pizza.id===newPizza.id) {
                        return newPizza;
                    }
                    return pizza;
                })
                return {
                    "pizzas": {
                        "pizzasList": newPizzaRef
                    }
                }

            });
        });
    });

    /* -------------- SEARCH FOR INGREDIENTS ---------------- */
    searchData = (searchTerm) => {
        IngredientsService.searchIngredient(searchTerm).then((response)=>{
            debugger;
            this.setState({
                ingredients: {
                    ingredientsList:response.data
                },
                page:0,
                pageSize:0,
                totalPages:0
            })
        })
    }


    render() {

        const routing = (
            <Router>
                <Header onSearch={this.searchData}/>
                <main role='main'>
                    <div className="container">
                        <Route path='/pizzas' exact render={() =>
                            <Pizzas onDelete={this.deletePizzas} onPageClick={this.loadPizzas} pizzas={this.state.pizzas.pizzasList} totalPages={this.state.pizzas.totalPages}/>
                        }/>

                        <Route path="/pizzas/:pizzaId/details" render={() =>
                            <PizzaDetails/>}/>
                        <Route path="/pizzas/:pizzaId/edit" render={()=>
                            <PizzaEdit onSubmit={this.updatePizzas}/>}/>

                        <Route path='/ingredients' exact render={() =>
                            <Ingredients onDelete={this.deleteIngredients} onPageClick={this.loadIngredients} ingredients={this.state.ingredients.ingredientsList} totalPages={this.state.ingredients.totalPages}/>
                        }/>
                        <Route path="/ingredients/:ingredientId/details" render={() =>
                            <IngredientDetails/>}/>
                        <Route path={"/ingredients/add"} render={()=><IngredientsAdd onNewTermAdded={this.createIngredient}/>}>
                        </Route>
                        <Route path="/ingredients/:ingredientId/edit" render={()=>
                            <IngredientEdit onSubmit={this.updateIngredients}/>}/>
                        <Route exact path="/"  render={() =>
                            <Ingredients onDelete={this.deleteIngredients} onPageClick={this.searchData} ingredients={this.state.ingredients.ingredientsList} totalPages={this.state.ingredients.totalPages}/>
                        }/>
                        <Redirect to={"/"}></Redirect>
                    </div>
                </main>
            </Router>
        )
        return (
            <div className="App">
                {routing}
            </div>
        );
    }
}

export default App;
