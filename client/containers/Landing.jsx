import React, { useState, useEffect, setState, useContext } from 'react'; 
import ReactDOM from 'react-dom';
import Connect from '../components/NavBar.jsx';
import AccountInfo from '../components/AccountInfo.jsx';
import NavBar from '../components/NavBar.jsx';
import DisplayData from '../components/DisplayData.jsx';
import Transactions from '../components/Transactions.jsx';
import '../styles.scss';
import myContext from '../contexts/GlobalContext.jsx'


function Landing () {
  
  // const [loggedIn, setLoggedIn] = useState(false); 

  // const test = useContext(myContext);
  // console.log(test);
  // test.updateLogin();  
  // console.log(test); 

  

  // Do fetch requests for transactions and accounts here and then pass them down into child components as props
  const accounts = [
    {
       account_id: 'yBDqZZbGZ5HX7GBrw654cpDGKWlP4ztyw43j8',
       account_subtype: 'checking',
       account_name: 'Plaid Gold Standard 0% Interest Checking',
       acount_balance: 100
    },
     {
       account_id: '9B5rggwqgKHnekAZP8D4fPExkdlAryuRg4GAo',
       account_subtype: 'savings',
       account_name: 'Plaid Silver Standard 0.1% Interest Saving',
       acount_balance: 200
     },
     {
       account_id: 'vK3X77RE7AuXymK3vlqxc4ZEWeabgMFW1qzNe',
       account_subtype: 'cd',
       account_name: 'Plaid Bronze Standard 0.2% Interest CD',
       acount_balance: null
     },
     {
       account_id: 'nWbE33JZ3wH6XP8Jv1EeU7xjAADvybF6QAerl',
       account_subtype: 'credit card',
       account_name: 'Plaid Diamond 12.5% APR Interest Credit Card',
       acount_balance: null
     },
     {
       account_id: 'b7wE99jB9gH3ZlQ8VozXC9rZBBV687sV7mxap',
       account_subtype: 'money market',
       account_name: 'Plaid Platinum Standard 1.85% Interest Money Market',
       acount_balance: 43200
   },
  ];

  const fakeUser = {
    user_id: 15, 
    hash: 'enifen47385h3b4ubf73',
    first_name: 'evan',
    last_name: 'perlman', 
    email: 'eperlman@gmail.com'
  }

  function handleChange(newValue) {
    setValue(newValue);
  }

  return (
  <div className ="landing">

      <div className = "leftSide">
        <NavBar user={fakeUser} accounts={accounts} onChange={handleChange}/> 
      </div>
      <div className = "rightSide">
        <AccountInfo accounts={accounts} />
        <DisplayData />
        <Transactions /> 
      </div>
  </div>
  )
}








export default Landing;