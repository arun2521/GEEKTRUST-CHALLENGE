import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {

    const handleSearch = (event) => {
        const newSearchTerm = event.target.value;
        onSearchChange(newSearchTerm);
    };

    return (
        <div className='search-bar-container'>
            <input
                type='text'
                className='search-input'
                placeholder='Search by name, email, or role'
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
}

export default SearchBar;