import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import IngredientsService from "../../repository/axiosIngredientsRepository";
import Pizza from '../PizzaComponents/pizza';

const IngredientsDetails = (props) => {
    const [ingredient, setIngredient] = useState({});
    const [pizza, setPizza] = useState([]);
    const {ingredientId} = useParams();
    const history = useHistory();
    useEffect(() => {
        IngredientsService.fetchIngredientById(ingredientId).then((data) => {
            if (data.data.veggie === false) data.data.veggie = 'No';
            if (data.data.veggie === true) data.data.veggie = 'Yes';
            if (data.data.spicy === true) data.data.spicy = 'Yes';
            if (data.data.spicy === false) data.data.spicy = 'No';
            setIngredient(data.data);
        });
        IngredientsService.fetchPizzasByIngredient(ingredientId).then((data) => {
            debugger;
            console.log('data', data.data)
            setPizza(data.data);
            console.log('pizza', pizza);
        });
        console.log("render");


    }, [])
    console.log(pizza);


    return (
        <div className="row">
            <form className="card">
                <h4 className="text-upper text-left">Details</h4>
                <div className="form-group row">
                    <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-left">Ingredient name</label>
                    <div className="col-sm-6">
                        <p type="text" name={'name'} value={ingredient.name} id="ingredient"
                           placeholder="Ingredient name">{ingredient.name}</p>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                    <div className="col-sm-6">
                        <p type="text" name={'amount'} value={ingredient.amount} id="amount"
                           placeholder="Amount">{ingredient.amount}</p>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-left">Veggie</label>
                    <div className="col-sm-6 col-xl-4">
                        <p id="veggie" name={"veggie"}>{ingredient.veggie}</p>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="spicy" className="col-sm-4 offset-sm-1 text-left">Spicy</label>
                    <div className="col-sm-6 col-xl-4">
                        <p id="spicy" name={'spicy'}>{ingredient.spicy}</p>
                    </div>
                </div>
                <table className="table tr-history table-striped small">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Veggie</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getPizzas(pizza)}
                    </tbody>
                </table>
            </form>
        </div>
    );

    function getPizzas(x) {

        if(x) {
            return pizza.map((p, index) => {

                console.log(props.pizzas);
                return (
                    <Pizza onDelete={props.onDelete} pizzaId={p.id} pizza={p} key={index}
                           colClass={"col-md-6 mt-2 col-sm-12"}/>
                );
            });
        } else {
            return null;
        }
    }
};


export default IngredientsDetails;
