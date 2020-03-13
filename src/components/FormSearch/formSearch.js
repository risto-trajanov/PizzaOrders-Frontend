import React from 'react';

const FormSearch = (props) => {

    const onSearch = (e)=>{
        e.preventDefault();
        props.onSearch(e.target.previousElementSibling.value);
    }


    return (
        <form  className="form-inline mt-2 mt-md-0">
            <input className="form-control mr-sm-2" name="searchTerm" placeholder="Search" aria-label="Search"/>
            <button onClick={onSearch} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
}

export default FormSearch;
