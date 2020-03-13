import React from 'react';
import Moment from "react-moment";
import {Link} from "react-router-dom";

const pizza = (props) => {
    const name = props.pizza.name;
    const description = props.pizza.description;
    const veggie = props.pizza.veggie ? "Yes" : "No";


    return (
        <tr>
            <td scope="col">{name}</td>
            <td scope="col">{description}</td>
            <td scope="col">{veggie}</td>
            <td scope="col">
                <button className="btn btn-sm btn-secondary">
                    <span className="fa fa-edit"/>
                    <Link className="btn btn-default" to={"/pizzas/"+props.pizzaId+"/edit"}><i className="fa fa-pencil"></i></Link>
                    <span><strong>Edit</strong></span>
                </button>
                <button
                    onClick={() =>
                        props.onDelete(props.pizzaId)}
                    style={btnStyle}>
                    <span className="fa fa-remove"/>
                    <span><strong>Remove</strong></span>
                </button>
                <Link to={"/pizzas/" + props.pizzaId + "/details"} className="btn btn-sm btn-outline-dark">

                    <span><strong>Details</strong></span>
                </Link>
            </td>
        </tr>
    );

};
const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'black',
    padding: '5px 9px',
    borderRadius: '5%',
    cursor: 'pointer',
    float: 'right',

}
pizza.propTypes = {};
pizza.defaultProps = {};

export default pizza;
