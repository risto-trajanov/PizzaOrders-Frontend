import axios from '../custom-axios/axios'
import qs from 'qs'

const PizzasService =  {
    fetchPizzas: ()=> {
        return axios.get("/api/pizzas");
    },
    fetchPizzasPaged:(page,pageSize)=>{
        return axios.get("/api/pizzas",{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    },
    fetchPizzaById:(id)=>{
        return axios.get(`/api/pizzas/${id}`);
    },
    addPizza: (pizza) => {
        const data = {
            ...pizza
        }
        const formParams = qs.stringify(data);
        return axios.post("/api/pizzas",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },
    updatePizzaTerm : (pizza) => {
        console.log(pizza);
        const data = {
            ...pizza
        }
        const ingID= pizza.id;
        const formParams = qs.stringify(data);
        console.log(formParams);
        return axios.patch("/api/pizzas/"+ingID,formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },
    deletePizzaTerm: (ingId) => {
        return axios.delete(`/api/pizzas/${ingId}`);
    },
    /*searchConsultationTerm: (searchTerm) => {
        return axios.get(`/api/consultations?term=${searchTerm}`);
    }*/

}


export default PizzasService;
