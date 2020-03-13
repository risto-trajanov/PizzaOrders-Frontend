import React,{useState,useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import axios from '../../custom-axios/axios'
import PizzasService from "../../repository/axiosPizzasRepository";

const PizzaEdit = (props) => {

    const [pizza,setPizza] = useState({});
    const {pizzaId} = useParams();
    const history = useHistory();
    useEffect(() => {
        PizzasService.fetchPizzaById(pizzaId).then((data) => {
            setPizza(data.data);
            console.log(data.data);
        })
    },[])
    const onFormSubmit = (e) => {
        e.preventDefault();
        if(pizza.veggie === 'false') pizza.veggie = false;
        if(pizza.veggie === 'true') pizza.veggie = true;
        if(pizza.spicy === 'true') pizza.spicy = true;
        if(pizza.spicy === 'false') pizza.spicy = true;
        console.log(pizza);
        props.onSubmit(pizza);
        history.push("/pizzas");

    }

    const handleTermOnChange  = (e) => {
        var paramValue = e.target.value;
        setPizza({...pizza, [e.target.name] : paramValue});
        if(pizza.veggie === 'false') pizza.veggie = false;
        if(pizza.veggie === 'true') pizza.veggie =  e.target.checked = true;
        if(pizza.spicy === 'true') pizza.spicy = e.target.checked =  true;
        if(pizza.spicy === 'false') pizza.spicy = e.target.checked = true;

    }

    return (
        <div className="row">
            <form className="card">
                <h4 className="text-upper text-left">Add/Edit Pizza</h4>
                <div className="form-group row">
                    <label htmlFor="pizza" className="col-sm-4 offset-sm-1 text-left">Pizza name</label>
                    <div className="col-sm-6">
                        <input type="text" name={'name'} value={pizza.name} onChange={handleTermOnChange.bind(this)} className="form-control" id="pizza" placeholder="Pizza name"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                    <div className="col-sm-6">
                        <input type="text" name={'amount'} value={pizza.amount} onChange={handleTermOnChange} className="form-control" id="amount" placeholder="Amount"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-left">Veggie</label>
                    <div className="col-sm-6 col-xl-4">
                        <input checked={pizza.veggie} value={pizza.veggie} type="checkbox" onChange={handleTermOnChange} className="form-control" id="veggie" name={"veggie"}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="spicy" className="col-sm-4 offset-sm-1 text-left">Spicy</label>
                    <div className="col-sm-6 col-xl-4">
                        <input checked={pizza.spicy ? true : false} value={pizza.spicy ? true : false} type="checkbox" onChange={handleTermOnChange} className="form-control" id="spicy" name={'spicy'}/>
                    </div>
                </div>

                <div className="form-group row">
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button onClick={onFormSubmit}
                                type="submit"
                                className="btn btn-primary text-upper">
                            Save
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            className="btn btn-warning text-upper">
                            Reset
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            className="btn btn-danger text-upper">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default PizzaEdit;
