import React from 'react';
import Moment from "react-moment";
import {Link} from "react-router-dom";

const ingredient = (props) => {
    const name = props.ingredient.name;
    const amount = props.ingredient.amount;
    const veggie = props.ingredient.veggie ? "Yes" : "No";
    const spicy = props.ingredient.spicy ? "Yes" : "No";


    return (
        <tr>
            <td scope="col">{name}</td>
            <td scope="col">{amount}</td>
            <td scope="col">{veggie}</td>
            <td scope="col">{spicy}</td>
            <td scope="col">
                <button className="btn btn-sm btn-secondary">
                    <span className="fa fa-edit"/>
                    <Link className="btn btn-default" to={"/ingredients/"+props.ingredientId+"/edit"}><i className="fa fa-pencil"></i></Link>
                    <span><strong>Edit</strong></span>
                </button>
                <button
                    onClick={() =>
                    props.onDelete(props.ingredientId)}
                    style={btnStyle}>
                    <span className="fa fa-remove"/>
                    <span><strong>Remove</strong></span>
                </button>
                <Link to={"/ingredients/" + props.ingredientId + "/details"} className="btn btn-sm btn-outline-dark">
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
ingredient.propTypes = {};
ingredient.defaultProps = {};

export default ingredient;
