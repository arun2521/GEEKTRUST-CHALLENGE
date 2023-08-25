import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import PaginationLogic from './components/PaginationLogic';
import SearchBar from './components/SearchBar';

function App() {

  const [ users, setUsers ] = useState([]);
  const [ selectedRows, setSelectedRows ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ searchTerm, setSearchTerm ] = useState('');

  const recordsPerPage = 10;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFilteredPages = Math.ceil(filteredUsers.length / recordsPerPage);

  const handleSearchChanges = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  }

  const deleteSelectedRows = () => {
    const updatedUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const toggleSelectRow = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter(id => id !== userId));
    }
    else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  const toggleSelectAllRows = (userId) => {
    if (selectedRows.length === userId.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...selectedRows, ...userId]);
    }
  };

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('An Error Occured', error);
    });
  }, []);

  return (
    <div className="App container">
      <SearchBar
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChanges}
      />
      <UserTable
        users={filteredUsers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        setUsers={setUsers}
        selectedRows={selectedRows}
        toggleSelectRow={toggleSelectRow}
        deleteSelectedRows={deleteSelectedRows}
        toggleSelectAllRows={toggleSelectAllRows}
        searchTerm={searchTerm}
      />
      <div className="pagination-and-delete">
        <button
          onClick={deleteSelectedRows}
          className="delete-button"
        >
          Delete Selected
        </button>
        <PaginationLogic
          currentPage={currentPage}
          totalPage={totalFilteredPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
