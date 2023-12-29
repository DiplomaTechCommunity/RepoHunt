import "../Search.css";
import PropTypes from 'prop-types';

const Search = ({  onSearch,searchQuery, setSearchQuery }) => {
    // State to store the search query

    // Function to Handle Search Event
    const handleSearch = (e) =>{
        setSearchQuery(e.target.value)
        onSearch(e.target.value);
    };
  return (
    <div>
      <div className="text-box">
        <p className="text linear-gradient">Search the Repositories </p>
        <p className="text"> here!</p>
      </div>
    
        <div className="search-bar">
          <input id="search-id" type="text" placeholder="Search..." 
          onChange={(e)=> handleSearch(e)} value={searchQuery}
          />
        <button className="searchButton">Search</button>
        </div>
      </div>
  );
};

Search.defaultProps = {
  searchQuery: '',
  setSearchQuery: ()=>{},
  onSearch: ()=>{}
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
};
export default Search;
