import React from 'react';
import './SearchBar.css'

const SearchBar = () => {
  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
