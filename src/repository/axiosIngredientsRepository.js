import axios from '../custom-axios/axios'
import qs from 'qs'

const IngredientsService =  {
    fetchIngredients: ()=> {
        return axios.get("/api/ingredients");
    },
    fetchIngredientsPaged:(page,pageSize)=>{
        return axios.get("/api/ingredients",{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    },
    fetchIngredientById:(id)=>{
        return axios.get(`/api/ingredients/${id}`);
    },
    fetchPizzasByIngredient:(id)=>{
        debugger;
        return axios.get(`/api/ingredients/${id}/pizzas`);
    },
    addIngredient: (ingredient) => {
        const data = {
            ...ingredient
        }
        const formParams = qs.stringify(data);
        return axios.post("/api/ingredients",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },
    updateIngredient : (ingredient) => {
        debugger;
        console.log(ingredient);
        const data = {
            ...ingredient
        }
        const ingID= ingredient.id;
        const formParams = qs.stringify(data);
        console.log(formParams);
        return axios.patch("/api/ingredients/"+ingID,formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },
    deleteIngredient: (ingId) => {
        return axios.delete("/api/ingredients/" + ingId,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },
    searchIngredient: (searchTerm) => {
        debugger;
        return axios.get("/api/ingredients?name=" + searchTerm, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    }

}


export default IngredientsService;
