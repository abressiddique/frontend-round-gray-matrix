import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/users";
  const [users, setusers] = useState([]);
  const [query, setquery] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((result) => setusers(result.data));
  }, []);

  const filterData = users.filter((user) => {
    const lowerQuery = query.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.phone.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setquery(e.target.value)}
        placeholder="Search by name, email, or phone"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filterData.length !== 0 ? (
            filterData.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
