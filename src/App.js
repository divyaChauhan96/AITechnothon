import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { faSortAlphaAsc, faSortAlphaDesc, faSortNumericAsc, faSortNumericDesc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function App() {
  const [resources, setResources] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [sortOrder, setSortOrder] = useState({
    id: 'def',
    name: 'def',
    department: 'def',
    designation: 'def',
    email: 'def'
  });
  //state variable for sort order
  const fetchResourcesData = () => {
    axios.get('https://my-json-server.typicode.com/assaga-dev/mockjson/user')
    .then((response) => {
      setResources(response?.data);
      setDataToDisplay(response?.data);
      setError(false);
      setIsLoading(false);
    })
    .catch((err) => {
      alert('Error Occured while fetching data '+err);
      console.log(err);
      setError(true);
      setIsLoading(false);
    })
  }

  useEffect(()=>{
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetchResourcesData();
    }, 3000);
    return () => {
      clearTimeout(timer);
    }
  },[])

  function searchTextUpdate(event) {
    setSearchText(event.target.value)
  }

  function search() {
    const newRes = [...dataToDisplay];
    const res = newRes.filter((res) => res.name.toLowerCase().includes(searchText.toLowerCase()));
    setDataToDisplay(res);
  }

  function reset() {
    const newRes = [...resources];
    setSearchText('');
    setDataToDisplay(newRes)
  }

  function sortById() {
    const newRes = [...dataToDisplay]
    // sort desc if the id sort order is asc
    if(sortOrder.id === 'asc') {
      setSortOrder({...sortOrder, id: 'desc'})
      setDataToDisplay(newRes.sort((a, b) => (a.id < b.id) ? 1 : -1))
    } else {
      setSortOrder({...sortOrder, id: 'asc'})
      setDataToDisplay(newRes.sort((a, b) => (a.id > b.id) ? 1 : -1))
  }
}

function sortByName() {
  const newRes = [...dataToDisplay]
  // sort desc if the name sort order is asc
  if(sortOrder.name === 'asc') {
    setSortOrder({...sortOrder, name: 'desc'})
    setDataToDisplay(newRes.sort((a, b) => (a.name < b.name) ? 1 : -1))
  } else {
    setSortOrder({...sortOrder, name: 'asc'})
    setDataToDisplay(newRes.sort((a, b) => (a.name > b.name) ? 1 : -1))
}
}

function sortByDepartment() {
  const newRes = [...dataToDisplay];
  //sort descending if department sort order is asc
  if(sortOrder.department === 'asc') {
    setSortOrder({...sortOrder, department: 'desc'})
    setDataToDisplay(newRes.sort((a, b) => (a.department < b.department) ? 1 : -1))
  } else {
    setSortOrder({...sortOrder, department: 'asc'})
    setDataToDisplay(newRes.sort((a, b) => (a.department > b.department) ? 1 : -1))
  }
}

function sortByDesignation() {
  const newRes = [...dataToDisplay]
  //sort desc if the designation sort order is asc
  if(sortOrder.designation === 'asc') {
    setSortOrder({...sortOrder, designation: 'desc'})
    setDataToDisplay(newRes.sort((a, b) => (a.designation < b.designation) ? 1 : -1))
  } else {
    setSortOrder({...sortOrder, designation: 'asc'})
    setDataToDisplay(newRes.sort((a, b) => (a.designation > b.designation) ? 1 : -1))
  }
}

function sortByEmail() {
  const newRes = [...dataToDisplay]
  // sort desc if the email is asc
  if(sortOrder.email === 'asc') {
    setSortOrder({...sortOrder, email: 'desc'})
    setDataToDisplay(newRes.sort((a, b) => (a.email < b.email) ? 1 : -1))
  } else {
    setSortOrder({...sortOrder, email: 'asc'})
    setDataToDisplay(newRes.sort((a, b) => (a.email > b.email) ? 1 : -1))
}
}
  
  return (
    <div className="App">
       
      <div>
      <input type="text" onChange={searchTextUpdate} value={searchText} placeholder="Search..." />
      <button disabled={isLoading} onClick={search}>Search</button>
      </div>
      <div>
      <button disabled={isLoading} onClick={sortById}>Sort by Id <FontAwesomeIcon icon={ sortOrder.id === 'asc' ? faSortNumericDesc : faSortNumericAsc} /></button>
      <button disabled={isLoading} onClick={sortByName}>Sort by Name <FontAwesomeIcon icon={ sortOrder.name === 'asc' ? faSortAlphaDesc : faSortAlphaAsc} /></button>
      <button disabled={isLoading} onClick={sortByDepartment}>Sort by Department <FontAwesomeIcon icon={ sortOrder.department === 'asc' ? faSortAlphaDesc : faSortAlphaAsc} /></button>
      <button disabled={isLoading} onClick={sortByDesignation}>Sort by Designation <FontAwesomeIcon icon={ sortOrder.designation === 'asc' ? faSortAlphaDesc : faSortAlphaAsc} /></button>
      <button disabled={isLoading} onClick={sortByEmail}>Sort by Email <FontAwesomeIcon icon={ sortOrder.email === 'asc' ? faSortAlphaDesc : faSortAlphaAsc} /></button>
      </div>
      <button disabled={isLoading} onClick={reset}>Reset</button>
      <h1>Resource Details</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody> 
          {!isLoading && dataToDisplay?.map((res) => {           return(
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.name}</td>
              <td>{res.department}</td>
              <td>{res.designation}</td>
              <td>{res.email}</td>
            </tr>)
      })}
         </tbody>
      </table> 
      {isLoading && <p>Fetching resources...</p>}
      {error && <p>Something went wrong! No records found!</p>}
    </div>
  );
}

export default App;
