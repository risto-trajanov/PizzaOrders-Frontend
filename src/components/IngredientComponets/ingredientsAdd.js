import React, {useEffect, useState} from 'react'
import {Redirect, useHistory, useParams} from 'react-router-dom';
import IngredientsService from "../../repository/axiosIngredientsRepository";
import {isElement} from "react-dom/test-utils";


const IngredientsAdd = (props) => {
    const history = useHistory();
    const [ingredient,setIngredient] = useState({});
    const [error, setError] = useState({});
    let enabled = false;
    const {ingredientId} = useParams();
    useEffect(() => {
        setIngredient({
            name:null,
            amount:null,
            veggie:null,
            spicy:null
        });
        setError(false);
        enabled = false;
    },[])
    const isEnabled = () => {
        return ingredient.name != null && ingredient.name != '' && ingredient.name.length <= 50
            || ingredient.amount != null && ingredient.amount != '' && ingredient.amount.length <= 50;

    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        debugger;
        if(ingredient.veggie === 'false' || ingredient.veggie == null) ingredient.veggie = false;
        if(ingredient.veggie === 'true') ingredient.veggie = true;
        if(ingredient.spicy === 'true') ingredient.spicy = true;
        if(ingredient.spicy === 'false' || ingredient.spicy == null) ingredient.spicy = false;
        props.onNewTermAdded(ingredient);
        history.push("/ingredients");

    }

    const handleTermOnChange  = (e) => {
        debugger;
        var paramValue = e.target.value;
        setIngredient({...ingredient, [e.target.name] : paramValue});
        if(ingredient.veggie === 'false') ingredient.veggie = false;
        if(ingredient.veggie === 'true') ingredient.veggie =  e.target.checked = true;
        if(ingredient.spicy === 'true') ingredient.spicy = e.target.checked =  true;
        if(ingredient.spicy === 'false') ingredient.spicy = e.target.checked = false;
        setError(isEnabled);
        console.log(error);
    }

    return (
        <div className="row">
            <form className="card">
                <h4 className="text-upper text-left">Add Ingredient</h4>
                <div className="form-group row">
                    <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-left">Ingredient name</label>
                    <div className="col-sm-6">
                        <input name={'name'} onChange={handleTermOnChange} type="text" className="form-control" id="ingredient" placeholder="Ingredient name"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                    <div className="col-sm-6">
                        <input name={'amount'} onChange={handleTermOnChange} type="text" className="form-control" id="amount" placeholder="Amount"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-left">Veggie</label>
                    <div className="col-sm-6 col-xl-4">
                        <input name={'veggie'} onChange={handleTermOnChange} type="checkbox" className="form-control" id="veggie"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="spicy" className="col-sm-4 offset-sm-1 text-left">Spicy</label>
                    <div className="col-sm-6 col-xl-4">
                        <input name={'spicy'} onChange={handleTermOnChange} type="checkbox" className="form-control" id="spicy"/>
                    </div>
                </div>

                <div className="form-group row">
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button disabled={!error} onClick={onFormSubmit}
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


export default IngredientsAdd;
