import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // This now contains our improved styling

function App() {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios.get(API_URL).then((result) => setUsers(result.data));
  }, []);

  const filteredUsers = users.filter((user) => {
    const lowerQuery = query.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.phone.toLowerCase().includes(lowerQuery)
    );
  });

  const totalPages = filteredUsers.length;
  const userToShow = filteredUsers[currentPage] || null;

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  return (
    <div className="container">
      <h2 className="heading">User Directory</h2>

      <input
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, email, or phone"
      />

      {userToShow ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userToShow.name}</td>
              <td>{userToShow.email}</td>
              <td>{userToShow.phone}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="no-data">No data found</p>
      )}

      <div className="pagination">
        <button onClick={goToPrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          {totalPages > 0 ? currentPage + 1 : 0} / {totalPages}
        </span>
        <button
          onClick={goToNext}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;