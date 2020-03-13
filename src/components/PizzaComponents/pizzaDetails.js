import React,{useState,useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import PizzasService from "../../repository/axiosPizzasRepository";

const PizzasDetails = (props) => {
    const [pizza,setPizza] = useState({});
    const {pizzaId} = useParams();
    const history = useHistory();
    useEffect(() => {
        PizzasService.fetchPizzaById(pizzaId).then((data) => {
            if(data.data.veggie === false) data.data.veggie = 'No';
            if(data.data.veggie === true) data.data.veggie = 'Yes';
            if(data.data.spicy === true) data.data.spicy = 'Yes';
            if(data.data.spicy === false) data.data.spicy = 'No';
            setPizza(data.data);
        })
    },[])




    return (
        <div className="row">
            <form className="card">
                <h4 className="text-upper text-left">Details</h4>
                <div className="form-group row">
                    <label htmlFor="pizza" className="col-sm-4 offset-sm-1 text-left">Pizza name</label>
                    <div className="col-sm-6">
                        <p type="text" name={'name'} value={pizza.name}   id="pizza" placeholder="Pizza name">{pizza.name}</p>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                    <div className="col-sm-6">
                        <p type="text" name={'description'} value={pizza.description}  id="description" placeholder="Amount">{pizza.description}</p>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-left">Veggie</label>
                    <div className="col-sm-6 col-xl-4">
                        <p id="veggie" name={"veggie"}>{pizza.veggie}</p>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="ingredients" className="col-sm-4 offset-sm-1 text-left">Ingredients</label>
                    <div className="col-sm-6 col-xl-4">
                    </div>
                </div>
            </form>
        </div>
    );
};


export default PizzasDetails;
