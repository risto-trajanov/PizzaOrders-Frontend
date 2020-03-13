import React from 'react';
import Pizza from './pizza'
import ReactPaginate from "react-paginate";

const pizzas = (props) => {
    const pizzaList = props.pizzas.map((pizza, index) =>{
        console.log(props.pizzas);
        return (
            <Pizza onDelete={props.onDelete} pizzaId={pizza.id} pizza={pizza} key={index} colClass={"col-md-6 mt-2 col-sm-12"}/>
        );
    });
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
                            <th scope="col">Description</th>
                            <th scope="col">Veggie</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pizzaList}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-outline-secondary">
                    <span><strong>Add new pizza</strong></span>
                </button>
            </div>
            {paginate()}
        </div>
    );
};
export default pizzas;
