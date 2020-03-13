import React,{useState,useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import axios from '../../custom-axios/axios'
import IngredientsService from "../../repository/axiosIngredientsRepository";

const IngredientEdit = (props) => {

    const [ingredient,setIngredient] = useState({});
    const {ingredientId} = useParams();
    const history = useHistory();
    useEffect(() => {
        IngredientsService.fetchIngredientById(ingredientId).then((data) => {
            setIngredient(data.data);
            console.log(data.data);
        })
    },[])
    const onFormSubmit = (e) => {
        e.preventDefault();
        if(ingredient.veggie === 'false') ingredient.veggie = false;
        if(ingredient.veggie === 'true') ingredient.veggie = true;
        if(ingredient.spicy === 'true') ingredient.spicy = true;
        if(ingredient.spicy === 'false') ingredient.spicy = true;
        console.log(ingredient);
        props.onSubmit(ingredient);
        history.push("/ingredients");

    }

    const handleTermOnChange  = (e) => {
        var paramValue = e.target.value;
        if(ingredient.veggie === 'false') ingredient.veggie = e.target.checked = false;
        if(ingredient.veggie === 'true') ingredient.veggie =  e.target.checked = true;
        if(ingredient.spicy === 'true') ingredient.spicy = e.target.checked =  true;
        if(ingredient.spicy === 'false') ingredient.spicy = e.target.checked = true;
        setIngredient({...ingredient, [e.target.name] : paramValue});
    }

    return (
        <div className="row">
            <form className="card">
                <h4 className="text-upper text-left">Add/Edit Ingredient</h4>
                <div className="form-group row">
                    <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-left">Ingredient name</label>
                    <div className="col-sm-6">
                        <input type="text" name={'name'} value={ingredient.name} onChange={handleTermOnChange.bind(this)} className="form-control" id="ingredient" placeholder="Ingredient name"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                    <div className="col-sm-6">
                        <input type="text" name={'amount'} value={ingredient.amount} onChange={handleTermOnChange} className="form-control" id="amount" placeholder="Amount"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-left">Veggie</label>
                    <div className="col-sm-6 col-xl-4">
                        <input checked={ingredient.veggie} value={ingredient.veggie} type="checkbox" onChange={handleTermOnChange} className="form-control" id="veggie" name={"veggie"}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="spicy" className="col-sm-4 offset-sm-1 text-left">Spicy</label>
                    <div className="col-sm-6 col-xl-4">
                        <input checked={ingredient.spicy} value={ingredient.spicy} type="checkbox" onChange={handleTermOnChange} className="form-control" id="spicy" name={'spicy'}/>
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


export default IngredientEdit;
