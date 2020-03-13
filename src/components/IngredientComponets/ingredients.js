import React from 'react';
import Ingredient from './ingredient'
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";

const ingredients = (props) => {

    const handlePageClick = (e) => {
        props.onPageClick(e.selected)
    }
    const paginate = () => {
        if (props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.page}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
    }
    return (
        <div>
            <div className="row">
                <h4 className="text-upper text-left">Ingredients</h4>
                <div className="table-responsive">
                    <table className="table tr-history table-striped small">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Spicy</th>
                            <th scope="col">Veggie</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {getIngred(props.ingredients)}
                        </tbody>
                    </table>
                </div>
                <Link to={"/ingredients/add"} className="btn btn-outline-secondary">
                    <span><strong>Add new ingredient</strong></span>
                </Link>
            </div>
            {paginate()}
        </div>
    );
    function getIngred(x) {
        return x.map((ingredient, index) =>{
            if (x != null){
                return (
                    <Ingredient onDelete={props.onDelete} ingredientId={ingredient.id} ingredient={ingredient} key={index} colClass={"col-md-6 mt-2 col-sm-12"}/>
                );}
            else {
                return <div>There are no ingredients yet, Add bellow !</div>
            }
        });
    }
};
export default ingredients;
