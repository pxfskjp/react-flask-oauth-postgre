import React, { Component } from 'react';
import Login from './components/login';
import Home from './components/home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
  }
  setAuth = () => {
    this.setState({ token: localStorage.getItem('token') });
  }

  LogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('imgUrl');
    toast.warn('You are logged out!');
    this.setState({ token: '' });
  }
  
  render() {
    return (
      <div>
        {this.state.token ? (<Home LogOut={this.LogOut} />) : (<Login setAuth={this.setAuth} />)}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
