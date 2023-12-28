import { useState } from "react";
import "../Search.css";
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => {
    // State to store the search query
    const [searchQuery, setSearchQuery] = useState('');

    // Function to Handle Search Event
    const handleSearch = (e) =>{
        e.preventDefault();

        onSearch(searchQuery);
    };
  return (
    <div>
      <div className="text-box">
        <p className="text linear-gradient">Search the Repositories </p>
        <p className="text"> here!</p>
      </div>
    
        <div className="search-bar">
          <form onSubmit={handleSearch}>
          <input id="search-id" type="text" placeholder="Search..." value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
          />
        <button className="searchButton">Search</button>
          </form>
        </div>
      </div>
  );
};

Search.defaultProps = {
  searchQuery: '',
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
export default Search;
