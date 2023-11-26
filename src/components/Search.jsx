import { useState } from "react";
import "../Search.css";
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => {
    // State to store the search query
    const [searchQuery, setSeachQuery] = useState('');

    // Functiont to Handle Search Event
    const handleSearch = (e) =>{
        e.preventDefault();

        onSearch(searchQuery);
    };
  return (
    <div className="bodyBG">
      <div className="text-box">
        <p className="text linear-gradient">Search the Repositories </p>
        <p className="text"> here</p>
      </div>
    
        <div className="search-bar">
          <form onSubmit={handleSearch}>
          <input id="search-id" type="text" placeholder="Search..." value={searchQuery}
          onChange={(e)=> setSeachQuery(e.target.value)}
          />
        <button className="searchButton">Search</button>
          </form>
        </div>
      </div>
  );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
export default Search;
