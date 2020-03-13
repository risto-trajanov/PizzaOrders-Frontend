import React from 'react';
import PropTypes from 'prop-types';
import FormSearch from "../FormSearch/formSearch";
import {Link} from "react-router-dom";

const header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link style={linkStyle} to='/pizzas'>Pizzas</Link>
                        </li>
                        <li className="nav-item ">
                            <Link style={linkStyle} to='/ingredients'>Ingredients</Link>
                        </li>
                    </ul>
                    <FormSearch onSearch={props.onSearch}/>
                    <form className="form-inline mt-2 mt-md-0 ml-3">
                        <a className="btn btn-outline-info my-2 my-sm-0" href="#">Login</a>
                    </form>
                </div>
            </nav>
        </header>
    );
};
const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '3px',
    padding: '5px'
}
header.propTypes = {};
header.defaultProps = {};

export default header;
