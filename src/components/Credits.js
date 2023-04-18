/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';

import React, { Component } from 'react';



const Credits = (props) => {
  let creditView = () => {
    const { credits } = props;
    

    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }
  return (
    <div>
      <h1>Credits</h1>
      Balance: {props.accountBalance} 
      <br/>
      CreditList:
      {creditView()}


      <form onSubmit={props.addCredit}>
        <input type="text" name="description" placeholder='Description'/>
        <input type="number" step = "0.01" name="amount" placeholder='Amount' />
        <button type="submit">Add Debit</button>
      </form>

      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits; 

