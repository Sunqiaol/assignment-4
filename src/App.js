/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component,} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      creditAmount : 0,
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }
  
 
  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }
 

    addCredit = (event) => {
      event.preventDefault(); // Prevent the page from reloading on submit
      const credit = this.state.creditList;
      credit.push({
        id:this.state.creditList.length + 1,
        description: event.target.elements.description.value,
        amount: event.target.elements.amount.value,
        date: new Date().toLocaleDateString() // Add the current date
      });
      this.setState({creditList:credit});
      const Balance = this.state.accountBalance+parseFloat(event.target.elements.amount.value)
      this.setState({accountBalance:Balance})
      event.target.reset(); // Reset the form fields to their initial state
    };
    
    addDebit = (event) => {
      event.preventDefault(); // Prevent the page from reloading on submit
      const debit = this.state.debitList;
      debit.push({
        id:this.state.debitList.length + 1,
        description: event.target.elements.description.value,
        amount: event.target.elements.amount.value,
        date: new Date().toLocaleDateString() // Add the current date
      });
      this.setState({debitList:debit});
      const Balance = this.state.accountBalance-parseFloat(event.target.elements.amount.value)
      this.setState({accountBalance:Balance})
      event.target.reset(); // Reset the form fields to their initial state
    };
   

  async componentDidMount() {
    let linkToAPI = 'https://johnnylaicode.github.io/api/credits.json';  // Link to remote website API endpoint

    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (users)
      let response = await axios.get(linkToAPI);
      // To get data object in the response, need to use "response.data"
      this.setState({creditList: response.data});  // Store received data in state's "users" object
    } 
    catch (error) {  // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }    
    }

    linkToAPI = 'https://johnnylaicode.github.io/api/debits.json';
    try {  // Accept success response as array of JSON objects (users)
      let response = await axios.get(linkToAPI);
      // To get data object in the response, need to use "response.data"
      this.setState({debitList: response.data});  // Store received data in state's "users" object
    } 
    catch (error) {  // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }    
    }

    const totalDebits = this.state.debitList.reduce((total,debits) => total + debits.amount,0)
    const totalcredit = this.state.creditList.reduce((total,credits) => total + credits.amount,0)
    this.setState({accountBalance:totalcredit-totalDebits})
  }

 
 
  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (
      <Credits credits={this.state.creditList} accountBalance={this.state.accountBalance}  addCredit = {this.addCredit} />) 
    const DebitsComponent = () => (
    <Debits debits={this.state.debitList} accountBalance={this.state.accountBalance} addDebit = {this.addDebit} />) 
    
      
  
    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/my-react-app">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;