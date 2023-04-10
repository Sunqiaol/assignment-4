/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';

import React, { Component } from 'react';



const Credits = (props) => {
  return (
    <div>
      <h1>Credits</h1>
      Balance: {props.accountBalance} 
      <br/>
      CreditList:
      <div className="container">
        {
          props.credits.map((credit) => (
            <div key={credit.id}>
              <h3>Name  {credit.id}: {credit.description} Amount:{credit.amount} Date : {credit.date}</h3>
              <p>------------------------------</p>
            </div>
          ))
        }
      </div>

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

